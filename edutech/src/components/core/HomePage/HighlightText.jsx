import React from 'react';

const HighlightText = ({ text }) => {
  return (
    <span className="gradient-text font-bold">
      {" "}{text}
    </span>
  );
};

export default HighlightText;
