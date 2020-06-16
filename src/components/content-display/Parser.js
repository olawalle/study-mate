import React from "react";
import MathParser from "./MathParser";
import HtmlParser from "./HtmlParser";
import { appUrl } from "../../services/urls";

const setImageUrl = (str) => {
    return str
      .replace(`<img src='assets`, `<img src='${appUrl}/assets`)
      .replace(`<img src="assets`, `<img src="${appUrl}/assets`)
      .replace("assets\\", "assets/");
  };

const Parser = ({className, question, isMathJax, inline}) => {
    return (
        <React.Fragment>
            { isMathJax 
                ? <MathParser className={className} inline={inline} question={question ? setImageUrl(question) : ""} />
                : <HtmlParser className={className} inline={inline} question={question ? setImageUrl(question) : ""} />      
            }
        </React.Fragment>
    )
}

export default Parser