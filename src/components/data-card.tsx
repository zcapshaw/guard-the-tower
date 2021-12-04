import React from "react";

const containerStyles = {
  backgroundColor: "#8954A8",
  width: "20rem",
  padding: "2rem 5rem",
  textAlign: "center",
  margin: "2rem",
};

const numberStyles = {
  padding: "2rem",
  fontSize: 32,
};

const DataCard = ({ title, number, footer }) => {
  return (
    <div style={containerStyles}>
      <p>{title}</p>
      <h1 style={numberStyles}>{number}</h1>
      <p>{footer}</p>
    </div>
  );
};

export default DataCard;
