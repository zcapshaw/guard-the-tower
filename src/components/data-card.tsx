import React from "react";

const containerStyles = {
  backgroundColor: "#8954A8",
};

const DataCard = ({ title, number, footer, currency, footerUrl }) => {
  return (
    <div
      style={containerStyles}
      class="flex flex-col items-center justify-center m-8 w-80 h-64"
    >
      <p>{title}</p>

      <p class="my-8">
        <span class="text-4xl">{number}</span> {currency}
      </p>
      <a class="underline" href={footerUrl} target="_blank">
        {footer}
      </a>
    </div>
  );
};

export default DataCard;
