import React from "react";
import parse from "html-react-parser";

const HtmlParser = ({ question, className, id, inline }) => {
    const props = {id}
  return (
      !inline 
      ?
        <div
            {...props}
            className={className}>
            {parse(question)}
        </div>
    : <span>{parse(question)}</span>
  );
};

export default HtmlParser;

