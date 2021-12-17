import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

const containerStyles = {
  backgroundColor: "#8954A8",
};

const DataCard = ({
  title,
  number,
  footer,
  currency,
  footerUrl,
  hasTooltip,
  emoji,
  img,
}) => {
  const tooltipText =
    "Calculated as: (GP price per mint * Current GP/USD price) / Current ETH/USD price";

  return (
    <div style={containerStyles} class="text-center m-4 p-4 w-1/2 h-72">
      {emoji ? (
        <div class="text-4xl mb-2">{emoji}</div>
      ) : (
        <div class="flex justify-center">
          <img src={img} class="w-12" />
        </div>
      )}

      <div class="flex justify-center text-xs md:text-base p-4">
        {title}{" "}
        {hasTooltip ? (
          <Tooltip title={tooltipText} arrow placement="top">
            <Icon sx={{ fontSize: "1rem" }}>
              <IoInformationCircleOutline />
            </Icon>
          </Tooltip>
        ) : (
          ""
        )}
      </div>

      <p class="my-8">
        <span class="text-xl md:text-4xl">{number}</span> {currency}
      </p>
      <a
        class={
          footerUrl ? "underline text-xs md:text-base" : "text-xs md:text-base"
        }
        href={footerUrl}
        target="_blank"
      >
        {footer}
      </a>
    </div>
  );
};

export { DataCard };
