import React from "react";
import parse from "html-react-parser";

const HtmlParser = ({ question, className, inline }) => {
  return (
      !inline 
      ?
        <p
            className={className}>
            {parse(question)}
        </p>
    : <span>{parse(question)}</span>
  );
};

export default HtmlParser;

