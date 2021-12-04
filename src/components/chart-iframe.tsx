import React from "react";

const containerStyles = {
  backgroundColor: "white",
  width: "75rem",
  height: "30rem",
  margin: "auto",
};

const iframeStyles = {
  width: "75rem",
  height: "30rem",
};

const ChartIframe = () => {
  return (
    <div style={containerStyles}>
      <iframe
        style={iframeStyles}
        src="https://dune.xyz/embeds/275555/519579/6962b8d0-997d-4440-a074-df47d1dc10e2"
      />
    </div>
  );
};

export default ChartIframe;
