import React from "react";

type ButtonProps = {
    onClick: () => void,
    id?: string,
    style: { [key: string]: string}
};

export default function Button({ onClick, id }: ButtonProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className="btn btn-primary run-btn"
      style={{
        display: "iconandtext",
        padding: "10px 100px",
        fontSize: "20px",
      }}
    >
      Run
    </button>
  );
}

// class MyComp extend React.Component {
//   render() {
//     return <div></div>
//   }
// }

// const myComp = ({text}) => {
// return <div>{text}</div>
// };

// import React, { useState, useEffect, useMemo, useSelect..... } from 'react';
