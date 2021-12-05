import React from "react";

const containerStyles = {
  backgroundColor: "white",
  width: "75rem",
  height: "30rem",
  margin: "auto",
};

const ChartIframe = () => {
  return (
    <div class="bg-white w-5/6 lg:w-4/5 2xl:w-1/2 h-72 mx-auto">
      <iframe
        class="w-full h-full"
        src="https://dune.xyz/embeds/275555/519579/6962b8d0-997d-4440-a074-df47d1dc10e2"
      />
    </div>
  );
};

export default ChartIframe;
