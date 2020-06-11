import React from "react";
import "./Terms.scss";
import { motion } from "framer-motion";
import Nav from "../../components/nav/Nav";
import backArrow from "../../assets/images/back.svg";
import { withRouter } from "react-router-dom";

export default withRouter(function Terms({ history }) {
  const back = () => {
    history.push("/edit-profile");
  };

  return (
    <motion.div
      className="terms"
      initial={{ opacity: 0, x: "-5vw" }}
      animate={{ opacity: 1, x: "0vw" }}
      exit={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Nav />
      <div className="body">
        <div className="banner">
          <span>
            <img
              src={backArrow}
              height="25"
              className="mr10"
              alt=""
              onClick={back}
              style={{ position: "relative", top: 5, cursor: "pointer" }}
            />
            Terms and conditions
          </span>
        </div>
        <div className="contents">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
            praesentium, expedita modi, perferendis natus repellendus eum,
            deleniti libero quaerat officia quam amet? Esse doloribus quas
            architecto sit mollitia soluta corporis? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Sint distinctio quibusdam sed aut
            facilis quaerat non nulla ipsam sapiente qui rerum, impedit est sit,
            at quam, maxime similique libero odio?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
            praesentium, expedita modi, perferendis natus repellendus eum,
            deleniti libero quaerat officia quam amet? Esse doloribus quas
            architecto sit mollitia soluta corporis? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Sint distinctio quibusdam sed aut
            facilis quaerat non nulla ipsam sapiente qui rerum, impedit est sit,
            at quam, maxime similique libero odio? Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Sit praesentium, expedita modi,
            perferendis natus repellendus eum, deleniti libero quaerat officia
            quam amet? Esse doloribus quas architecto sit mollitia soluta
            corporis? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Sint distinctio quibusdam sed aut facilis quaerat non nulla ipsam
            sapiente qui rerum, impedit est sit, at quam, maxime similique
            libero odio? Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Sit praesentium, expedita modi, perferendis natus repellendus
            eum, deleniti libero quaerat officia quam amet? Esse doloribus quas
            architecto sit mollitia soluta corporis? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Sint distinctio quibusdam sed aut
            facilis quaerat non nulla ipsam sapiente qui rerum, impedit est sit,
            at quam, maxime similique libero odio?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
            praesentium, expedita modi, perferendis natus repellendus eum,
            deleniti libero quaerat officia quam amet? Esse doloribus quas
            architecto sit mollitia soluta corporis? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Sint distinctio quibusdam sed aut
            facilis quaerat non nulla ipsam sapiente qui rerum, impedit est sit,
            at quam, maxime similique libero odio? Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Sit praesentium, expedita modi,
            perferendis natus repellendus eum, deleniti libero quaerat officia
            quam amet? Esse doloribus quas architecto sit mollitia soluta
            corporis? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Sint distinctio quibusdam sed aut facilis quaerat non nulla ipsam
            sapiente qui rerum, impedit est sit, at quam, maxime similique
            libero odio? Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Sit praesentium, expedita modi, perferendis natus repellendus
            eum, deleniti libero quaerat officia quam amet? Esse doloribus quas
            architecto sit mollitia soluta corporis? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Sint distinctio quibusdam sed aut
            facilis quaerat non nulla ipsam sapiente qui rerum, impedit est sit,
            at quam, maxime similique libero odio? Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Sit praesentium, expedita modi,
            perferendis natus repellendus eum, deleniti libero quaerat officia
            quam amet? Esse doloribus quas architecto sit mollitia soluta
            corporis? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Sint distinctio quibusdam sed aut facilis quaerat non nulla ipsam
            sapiente qui rerum, impedit est sit, at quam, maxime similique
            libero odio?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
            praesentium, expedita modi, perferendis natus repellendus eum,
            deleniti libero quaerat officia quam amet? Esse doloribus quas
            architecto sit mollitia soluta corporis? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Sint distinctio quibusdam sed aut
            facilis quaerat non nulla ipsam sapiente qui rerum, impedit est sit,
            at quam, maxime similique libero odio?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
            praesentium, expedita modi, perferendis natus repellendus eum,
            deleniti libero quaerat officia quam amet? Esse doloribus quas
            architecto sit mollitia soluta corporis? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Sint distinctio quibusdam sed aut
            facilis quaerat non nulla ipsam sapiente qui rerum, impedit est sit,
            at quam, maxime similique libero odio?
          </p>
        </div>
      </div>
    </motion.div>
  );
});
