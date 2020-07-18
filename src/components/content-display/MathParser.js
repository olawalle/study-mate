import React from "react";
import MathJax from "react-mathjax-preview";

const MathParser = ({ question, className, id, inline }) => {
  const props = { id };
  return !inline ? (
    <div className={className} {...props}>
      <MathJax math={question} />
    </div>
  ) : (
    <div>
      <MathJax math={question} />
    </div>
  );
};

export default MathParser;
