import React from "react";
import MathJax from 'react-mathjax-preview'
import parse from "html-react-parser";

const MathParser = ({question, className, inline}) => {
    return (
        !inline 
        ? <div className={className}>
              <MathJax math={parse(question)} />
          </div>
        : <span><MathJax math={parse(question)} /></span>
    );
}

export default MathParser;
