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
import { useContext } from "react";
import { userContext } from "../../store/UserContext";
import authServices from "../../services/authServices";
import Loader from "../../components/loader/Loader";
import HtmlParser from "../../components/content-display/HtmlParser";
import RavePay from "../../components/rave-pay/RavePay";
import { useHistory } from "react-router-dom";

export default function Subscribe() {
    const history = useHistory();
    const [currentPlans, setCurrentPlans] = useState([]);
    const [currentPlan, setCurrentPlan] = useState({});
    const [showResponse, setShowResponse] = useState({open: false, success: false, message: ""});
    const { loading, updateLoader, user, ...context } = useContext(userContext);

    const logout = () => {
        context.logout();
        setTimeout(() => {
            history.push("/login");
        }, 200);
    };

    useEffect(() => {
        updateLoader(true);
        authServices
            .getSubscriptions()
            .then((res) => {
                console.log({ subs: res.data });
                const data = res.data.map(s => ({ ...s, value: s.name, label: s.name }));
                setCurrentPlans(data)
                setCurrentPlan(data.length ? data[0] : currentPlan)
                updateLoader(false);
            })
            .catch((err) => {
                console.log({ err });
                updateLoader(false);
            });
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

    const onCloaseResponseModal = () => {
        setShowResponse({ ...showResponse, open: false });
        if (showResponse.success) {
            logout()
        }
        
    };

    const handleChange = (selectedOption) => {
        setplan(selectedOption);
        setCurrentPlan(selectedOption);
        let ind = plans.find((p, i) => {
            let index = p.value === selectedOption.value;
        });
        console.log(ind);
    };

    const handleResponse = (success, message) => {
        setopen(false);
        setShowResponse({ open: true, success, message });
    }

    return (
        <div className="subscribe">
            {loading && <Loader />}
            <div className="wide">
                <div className="bordered types">
                    <p>Select Preferred Plan</p>
                    <Select
                        placeholder="Select Plan"
                        value={currentPlan}
                        defaultValue={currentPlan}
                        onChange={handleChange}
                        options={currentPlans}
                    />
                </div>

                <div className="grey">
                    <div className="bordered">
                        <div className="img">
                            <img src={streak} alt="" /> <br />
                            <b>N{currentPlan .amount}</b>
                        </div>
                        <div className="list">
                            <p>{currentPlan.name}</p>
                            <HtmlParser question={(currentPlan && currentPlan.description) ? currentPlan.description : ""} inline={true} />
                        </div>
                    </div>
                    <div className="btm">
                        <RavePay userId={user.id} subId={currentPlan.id} amount={currentPlan.amount} handleResponse={(status, message) => handleResponse(status, message)}
                            customer_email={user.email} customer_phone={user.phoneNumber ? user.phoneNumber : "+2348118505335"} />
                        {/*<button className="tw-btn">Continue</button>*/}
                    </div>
                    {/*<button className="tw-btn" onClick={() => setopen(true)}>
                        Subscribe
          </button>*/}
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
                        <p className="amt">{currentPlan.amount}</p>
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
                    
                </div>
            </Modal>

            <Modal open={showResponse.open} onClose={onCloaseResponseModal} center className="mooooo">
                <div className="subscribe-modal">
                    <div className="top">
                        {
                            showResponse.success ?
                                <>
                                    <p className="sm">Thank you for your subscription</p>
                                    <p className="sm">{showResponse.message && showResponse.message || `You are now subscribed for our ${currentPlan.name} plan.`}</p>
                                    <p className="sm">Please log back in.</p>
                                </>
                                : <p>Please an error occured, do try again</p>
                        }
                        
                    </div>
                </div>
            </Modal>
        </div>
    );
}
