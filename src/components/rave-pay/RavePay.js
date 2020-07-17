import React, { useState } from "react";
import Rave, { VerifyTransaction } from "react-flutterwave-rave";
import authServices from "../../services/authServices";
import { createRef } from "react";

export default function RavePay({
    customer_email,
    customer_phone,
    amount,
    subId,
    userId,
    handleResponse
}) {
    const ref = createRef();
    const [success, setSuccess] = useState(false)
    const callback = (response) => {
        VerifyTransaction({ live: true, txref: response.tx.txRef, SECKEY: "FLWSECK-ec881f62a9ec29788819bcfe9a8972d3-X" })
            .then(function (resp) {
                console.log(ref.current)
                authServices
                    .activateUserSub({ subId, userId })
                    .then((res) => {
                        ref.current.onclose(true);
                        console.log({ usersub: res.data });
                    })
                    .catch((err) => {
                        console.log({ err });
                        ref.current.onclose(true);
                        handleResponse(success, "Your payment was successful but we could not subscribe you at the moment. Please notify us.");
                    });
            })
            .catch(function (error) {
                console.log(error);
                setSuccess(false)
            });
        console.log({response})
        
    };
    const onclose = (state = false) => {
        console.log("user closed");
        handleResponse(success)
    };
    const raveProps = {
        pay_button_text: "Subscribe",
        class: "rave__button",
        payment_method: "card",
        customer_email,
        customer_phone,
        amount: "" + amount + "",
        ravePubKey: "FLWPUBK-0d1f67d88f088393c1f7cfafd807e6e8-X",
        callback,
        onclose,
    };
    return (
        <Rave ref={ref} {...raveProps} />
    );
}