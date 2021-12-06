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
}) => {
  const tooltipText =
    "Calculated as: (GP price per mint * Current GP/USD price) / Current ETH/USD price";

  return (
    <div
      style={containerStyles}
      class="flex flex-col items-center justify-center m-8 w-80 h-64"
    >
      <div class="flex">
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
        <span class="text-4xl">{number}</span> {currency}
      </p>
      <a class="underline" href={footerUrl} target="_blank">
        {footer}
      </a>
    </div>
  );
};

export default DataCard;
