import React, { useState } from "react";
import Rave from "react-flutterwave-rave";
import authServices from "../../services/authServices";

export default function RavePay({
    customer_email,
    customer_phone,
    amount,
    subId,
    userId,
    handleResponse
}) {
    const [success, setSuccess] = useState(false)
    const callback = (response) => {
        //VerifyTransaction({ live: true, txref: response.tx.txRef, SECKEY: "FLWSECK-0f9d880638d7ac2f1ce36421781c806c-X" })
        //    .then(function (resp) {
        //        authServices
        //            .activateUserSub({ subId, userId })
        //            .then((res) => {
        //                console.log({ usersub: res.data });
        //                handleResponse(true)
        //            })
        //            .catch((err) => {
        //                console.log({ err });
        //                handleResponse(false)
        //            });
        //    })
        //    .catch(function (error) {
        //        console.log(error);
        //        handleResponse(true)
        //    });
        console.log({response})
        authServices
            .activateUserSub({ subId, userId })
            .then((res) => {
                console.log({ usersub: res.data });
                setSuccess(true)
            })
            .catch((err) => {
                console.log({ err });
                setSuccess(false)
            });
    };
    const onclose = (state = false) => {
        console.log("user closed");
        handleResponse(success)
    };
    const raveProps = {
        pay_button_text: "Continue",
        class: "rave__button",
        payment_method: "card",
        customer_email,
        customer_phone,
        amount: "" + amount + "",
        ravePubKey: "FLWPUBK-1d4c9f3f90d9b73a0ca5a18852cd04df-X",
        callback,
        onclose,
    };
    return (
        <Rave {...raveProps} />
    );
}