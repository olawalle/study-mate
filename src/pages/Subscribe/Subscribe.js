import React from "react";
import { useState } from "react";
import Select from "react-select";
import Modal from "react-responsive-modal";
import "./Subscribe.scss";
import streak from "../../assets/images/streak.svg";
import bank from "../../assets/images/Bank.svg";
import creditCard from "../../assets/images/credit-card.svg";
import close from "../../assets/images/close.svg";
import { useEffect } from "react";

export default function Subscribe() {
  useEffect(() => {
    console.log(plans[0]);
    setplan(plans[0]);
  }, []);

  const plans = [
    {
      value: "Weekly",
      label: "Weekly",
      price: "1,500",
      points: [
        "Access to all the contents",
        "Points, badges, levels and full gamification features.",
        "Learning Analytics",
        "Rewards and benefits",
      ],
    },
    {
      value: "Monthly",
      label: "Monthly",
      price: "4,000",
      points: [
        "Access to all the contents",
        "Points, badges, levels and full gamification features.",
        "Learning Analytics",
        "Rewards and benefits",
      ],
    },
    {
      value: "Yearly",
      label: "Yearly",
      price: "15,000",
      points: [
        "Access to all the contents",
        "Points, badges, levels and full gamification features.",
        "Learning Analytics",
        "Rewards and benefits",
      ],
    },
  ];
  const [plan, setplan] = useState({});
  const [selected, setselected] = useState(null);
  const [open, setopen] = useState(false);
  const [pickedIndex, setpickedIndex] = useState(1);

  const onCloseModal = () => {
    setopen(false);
  };

  const handleChange = (selectedOption) => {
    setplan(selectedOption);
    let ind = plans.find((p, i) => {
      let index = p.value === selectedOption.value;
    });
    console.log(ind);
  };

  return (
    <div className="subscribe">
      <div className="wide">
        <div className="bordered types">
          <p>Select Preferred Plan</p>
          <Select
            placeholder="Select Plan"
            // value={plan}
            defaultValue={plan}
            onChange={handleChange}
            options={plans}
          />
        </div>

        <div className="grey">
          <div className="bordered">
            <div className="img">
              <img src={streak} alt="" /> <br />
              <b>N{plan.price}</b>
            </div>
            <div className="list">
              <p>{plan.value}</p>
              <ul>
                {plan.points && plan.points.map((point, i) => <li>{point}</li>)}
              </ul>
            </div>
            <button className="tw-btn" onClick={() => setopen(true)}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={onCloseModal} center className="moooooooo">
        <div className="subscribe-modal">
          <div className="top">
            <img
              src={close}
              onClick={onCloseModal}
              className="f-right close"
              width="20"
              alt=""
            />
            <p className="sm">You will pay</p>
            <p className="amt">2,500</p>
            <p className="sm">Choose your payment method</p>
            <div
              onClick={() => setselected(1)}
              className={`box ${selected === 1 ? "selected" : ""}`}
            >
              <img src={creditCard} alt="" />
              <p className="sm">Card</p>
            </div>
            <div
              onClick={() => setselected(2)}
              className={`box ${selected === 2 ? "selected" : ""}`}
            >
              <img src={bank} alt="" />
              <p className="sm">Bank Transfer</p>
            </div>
          </div>
          <div className="btm">
            <button className="tw-btn">Continue</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
