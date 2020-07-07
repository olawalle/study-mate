import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import "./Statistics.scss";
class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: ["one", "two", "three"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 30],
            backgroundColor: [
              "rgb(0, 41, 132)",
              "rgb(16, 163, 255)",
              "rgb(247, 174, 74)",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    };
  }

  render() {
    return (
      <div className="statistics bg-bottom" style={{ padding: "15px" }}>
        <Doughnut data={this.state.data} options={this.state.options} />
        <div className="legends">
          <div className="legend vids">
            <p>
              <span
                style={{
                  backgroundColor: this.state.data.datasets[0]
                    .backgroundColor[0],
                }}
              ></span>{" "}
              Completed Videos
            </p>
            <span>{this.state.data.datasets[0].data[0]}%</span>
          </div>
          <div className="legend left">
            <p>
              <span
                style={{
                  backgroundColor: this.state.data.datasets[0]
                    .backgroundColor[1],
                }}
              ></span>{" "}
              Quiz
            </p>
            <span>{this.state.data.datasets[0].data[1]}%</span>
          </div>
          <div className="legend left">
            <p>
              <span
                style={{
                  backgroundColor: this.state.data.datasets[0]
                    .backgroundColor[2],
                }}
              ></span>{" "}
              Mastery
            </p>
            <span>{this.state.data.datasets[0].data[2]}%</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Statistics;
