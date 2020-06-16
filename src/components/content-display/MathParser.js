import React from "react";
import MathJax from 'react-mathjax-preview'
import parse from "html-react-parser";

const MathParser = ({question, className, id, inline}) => {
    const props = {id}
    return (
        !inline 
        ? <div className={className} {...props}>
              <MathJax math={parse(question)} />
          </div>
        : <span><MathJax math={parse(question)} /></span>
    );
}

export default MathParser;