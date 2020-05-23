import React, { useState } from "react";
import "./Sidebar.scss";
import students from "../../assets/images/students.png";
import { useRouteMatch, Link } from "react-router-dom";

import userIcon from "../../assets/images/user.svg";
import editIcon from "../../assets/images/edit.svg";

export default function Sidebar() {
  let match = useRouteMatch();
  const [links, setlinks] = useState([
    { text: "Learn", to: "", icon: "dashboard" },
    { text: "Progress", to: "progress", icon: "edit" },
    { text: "My Profile", to: "profile", icon: "account" },
  ]);

  const [linkIndex, setlinkIndex] = useState(0);

  const icons = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15.52"
      height="15.52"
      style={{ position: "relative", top: 2 }}
      viewBox="0 0 15.52 15.52"
    >
      <path
        className="a"
        d="M11.622,3V8.173h6.9V3m-6.9,15.52h6.9V9.9h-6.9M3,18.52H9.9V13.347H3m0-1.724H9.9V3H3Z"
        transform="translate(-3 -3)"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14.787"
      height="14.787"
      viewBox="0 0 14.787 14.787"
      style={{ position: "relative", top: 2 }}
    >
      <path
        className="a"
        d="M9.393,2a7.393,7.393,0,1,0,7.393,7.393H15.308A5.915,5.915,0,1,1,9.393,3.479V2m5.013.739a.511.511,0,0,0-.355.148l-.9.895L15,5.63l.9-.895a.5.5,0,0,0,0-.7L14.754,2.887a.494.494,0,0,0-.347-.148M12.624,4.307,7.175,9.763v1.848H9.024l5.449-5.456Z"
        transform="translate(-2 -2)"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16.871"
      height="16.871"
      viewBox="0 0 16.871 16.871"
      style={{ position: "relative", top: 2 }}
    >
      <g transform="translate(0.25 0.25)">
        <path
          className="a"
          d="M16.371,8.185a8.185,8.185,0,1,0-8.185,8.185A8.181,8.181,0,0,0,16.371,8.185ZM8.185.959a7.227,7.227,0,0,1,5.989,11.271,8.182,8.182,0,0,0-11.977,0A7.227,7.227,0,0,1,8.185.959ZM2.8,13a7.224,7.224,0,0,1,10.781,0A7.219,7.219,0,0,1,2.8,13Zm0,0"
        />
        <path
          className="a"
          d="M168.878,67.715a2.881,2.881,0,0,0,2.878-2.878v-.959a2.878,2.878,0,1,0-5.755,0v.959A2.881,2.881,0,0,0,168.878,67.715Zm-1.918-3.837a1.918,1.918,0,1,1,3.837,0v.959a1.918,1.918,0,0,1-3.837,0Zm0,0"
          transform="translate(-160.692 -59.05)"
        />
      </g>
    </svg>,
  ];

  return (
    <div className="sidebar">
      <div className="upper">
        <div className="user">
          <img
            src={userIcon}
            style={{ height: "100%", margin: " 12px auto" }}
            alt=""
          />
          <div className="edit">
            <img
              src={editIcon}
              style={{ height: "20px", margin: "10px auto" }}
              alt=""
            />
          </div>
        </div>
        <p className="user-details">
          Chisom Blessing
          <span>Junior secondary</span>
        </p>
        <ul>
          {links.map((link, i) => {
            return (
              <li
                onClick={() => setlinkIndex(i)}
                className={linkIndex === i ? "active" : ""}
                key={link.text}
              >
                <Link to={`${match.path}${link.to}`}>
                  {icons[i]}
                  {link.text}

                  <svg
                    version="1.1"
                    x="0px"
                    y="0px"
                    width="15px"
                    height="15px"
                    className="f-right mt5 mr0"
                    viewBox="0 0 512.005 512.005"
                  >
                    <g>
                      <g>
                        <path
                          d="M388.418,240.923L153.751,6.256c-8.341-8.341-21.824-8.341-30.165,0s-8.341,21.824,0,30.165L343.17,256.005
                          L123.586,475.589c-8.341,8.341-8.341,21.824,0,30.165c4.16,4.16,9.621,6.251,15.083,6.251c5.461,0,10.923-2.091,15.083-6.251
                          l234.667-234.667C396.759,262.747,396.759,249.264,388.418,240.923z"
                        />
                      </g>
                    </g>
                  </svg>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <img src={students} alt="" className="students" />
    </div>
  );
}
