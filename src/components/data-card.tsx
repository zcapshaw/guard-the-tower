import React from "react";

const containerStyles = {
  backgroundColor: "#8954A8",
  width: "20rem",
  padding: "2rem 5rem",
  textAlign: "center",
  margin: "2rem",
};

const numberStyles = {
  fontSize: 36,
};

const middleText = {
  margin: "3rem",
};

const linkStyles = {
  color: "white",
};

const DataCard = ({ title, number, footer, currency, footerUrl }) => {
  return (
    <div style={containerStyles}>
      <p>{title}</p>

      <p style={middleText}>
        <span style={numberStyles}>{number}</span> {currency}
      </p>
      <a style={linkStyles} href={footerUrl} target="_blank">
        {footer}
      </a>
    </div>
  );
};

export default DataCard;
