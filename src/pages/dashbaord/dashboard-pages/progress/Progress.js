import React, { useState } from "react";
import Select from "react-select";

import "./Progress.scss";
import Statistics from "../../../../components/statistics/Statistics";

import play from "../../../../assets/images/play.svg";
import Badges from "../../../../components/badges/Badges";
import Links from "../../../../components/sidebar/Links";
export default function Progress() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedOption, setselectedOption] = useState("");
  const handleChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    setselectedOption(selectedOption);
  };

  return (
    <div className="progress">
      <div className="links-wrap">
        <Links />
      </div>
      <div className="wide-side">
        <p className="heading">Learning Statistics</p>
        <div className="stats">
          <p className="sub-heading">
            Latest activity may take 10 mins to show below.
          </p>
          <div className="filters">
            <div className="selects">
              <Select
                placeholder="Filter date"
                value={selectedOption}
                onChange={handleChange}
                options={options}
              />
            </div>
            <div className="selects">
              <Select
                placeholder="Filter date"
                value={selectedOption}
                onChange={handleChange}
                options={options}
              />
            </div>
            <button className="tw-btn">Search</button>
          </div>

          <div className="fixed-table mt40">
            <div className="tr thead">
              <div className="th activity">Activity</div>
              <div className="th">Date</div>
              <div className="th">Level</div>
              <div className="th points">Points aquired</div>
              <div className="th">Test score</div>
            </div>
            <div className="tbody">
              <div className="tr">
                <div className="td activity">
                  {" "}
                  <img src={play} width="15" className="mr5" alt="" />{" "}
                  Mathematics quiz 1
                </div>
                <div className="td">05/05/2020</div>
                <div className="td">Level 1</div>
                <div className="td points">1000</div>
                <div className="td">12/21</div>
              </div>
              <div className="tr">
                <div className="td activity">
                  {" "}
                  <img src={play} width="15" className="mr5" alt="" />{" "}
                  Mathematics quiz 1
                </div>
                <div className="td">05/05/2020</div>
                <div className="td">Level 1</div>
                <div className="td points">1000</div>
                <div className="td">12/21</div>
              </div>
              <div className="tr">
                <div className="td activity">
                  {" "}
                  <img src={play} width="15" className="mr5" alt="" />{" "}
                  Mathematics quiz 1
                </div>
                <div className="td">05/05/2020</div>
                <div className="td">Level 1</div>
                <div className="td points">1000</div>
                <div className="td">12/21</div>
              </div>
              <div className="tr">
                <div className="td activity">
                  {" "}
                  <img src={play} width="15" className="mr5" alt="" />{" "}
                  Mathematics quiz 1
                </div>
                <div className="td">05/05/2020</div>
                <div className="td">Level 1</div>
                <div className="td points">1000</div>
                <div className="td">12/21</div>
              </div>
              <div className="tr">
                <div className="td activity">
                  {" "}
                  <img src={play} width="15" className="mr5" alt="" />{" "}
                  Mathematics quiz 1
                </div>
                <div className="td">05/05/2020</div>
                <div className="td">Level 1</div>
                <div className="td points">1000</div>
                <div className="td">12/21</div>
              </div>
              <div className="tr">
                <div className="td activity">
                  {" "}
                  <img src={play} width="15" className="mr5" alt="" />{" "}
                  Mathematics quiz 1
                </div>
                <div className="td">05/05/2020</div>
                <div className="td">Level 1</div>
                <div className="td points">1000</div>
                <div className="td">12/21</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="narrow-side">
        <div className="badge-wrap">
          <Badges />
        </div>
        <div className="bg_white mt30">
          <p className="heading">
            Overall Statistics <span className="f-right">Subjects</span>
          </p>
          <Statistics />
        </div>
      </div>
    </div>
  );
}
