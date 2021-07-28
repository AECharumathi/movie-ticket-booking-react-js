import React, { Component } from "react";
import SeatPicker from "react-seat-picker";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";
import seats from "./seats";
//import "./styles.css";

class Seating extends Component {
  state = {
    loading: false,
    seatNumber: [],
    seatError: false,
    totalPrice: 0.0,
  };

  addSeatCallback = ({ row, number, id }, addCb) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
         console.log(`Added seat ${number}, row ${row}, id ${id}, number ${JSON.stringify(this.state.seatNumber)}`);
        const newTooltip = `you have selected seat ${id}`;
        addCb(row, number, id, newTooltip);
        this.setState({
          loading: false,
          seatNumber: this.state.seatNumber.concat(number),
        });
      }
    );
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
        removeCb(row, number, newTooltip);
        const idx = this.state.seatNumber.filter((numb)=> numb !== number);
        this.setState({
          loading: false,
          seatNumber: idx,
        });
      //  console.log(`Removed seat ${number}, row ${row}, id ${id} number ${JSON.stringify(this.state.seatNumber)}`);
      }
    );
  };

  handleSeats = () => {
    console.log(JSON.stringify(this.state.seatNumber));
    if (this.state.seatNumber.length === parseInt(this.props.maxTicket)) {
      this.props.sendSeats(this.state.seatNumber);
      this.setState({
        seatError: false,
      });
    } else {
      this.setState({
        seatError: true,
      });
    }
  };

  render() {
    const { loading } = this.state;
    let totalPrice = 0.0;
    return (
      <div style={{ margin: "10px" }}>
        {this.state.seatError ? (
          <span className="error-msg">
            Seats selected should be {this.props.maxTicket}
          </span>
        ) : null}
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-around",
          }}
          className="movie-detail-background"
        >
          <div style={{
              width: "50%"
          }}>
            <h4>Select your seat</h4>
            <SeatPicker
              addSeatCallback={this.addSeatCallback}
              removeSeatCallback={this.removeSeatCallback}
              rows={this.props.rows}
              maxReservableSeats={parseInt(this.props.maxTicket)}
              alpha
              visible
              selectedByDefault
              loading={loading}
              tooltipProps={{ multiline: true }}
            />
          </div>
          <div>
          
          {this.state.seatNumber.length > 0 ?
            <div  style={{
                width: "50%"
            }}>
              <h4>Billing & Payment</h4>
              <Table responsive="md">
                <thead>
                  <tr>
                    <th>SNO</th>
                    <th>Seat No</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  { seats.map((row) => this.state.seatNumber.map((seatNo, index) => 
                        
                          row.filter((rw)=> rw.number === seatNo).map((seat) => {
                             totalPrice = totalPrice+seat.price
                            return (<tr>
                                  <td>{index+1}</td>
                                  <td>{seatNo}</td>
                                  <td>{seat.price}</td>
                                </tr>)
                          })
                        )
                      )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={2}>Total amount </th>
                        <td>INR {totalPrice}</td>
                    </tr>
                </tfoot>
              </Table>
            </div>
            : null}
          </div>
        </div>
        <Button
          variant="primary"
          className="seat-button"
          onClick={() => this.handleSeats()}
        >
          Add Seats
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    seatDetail: state.seatDetail.seatDetail,
  };
}

export default connect(mapStateToProps)(Seating);
