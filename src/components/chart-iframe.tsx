import React from "react";

const ChartIframe = ({ url }) => {
  return (
    <div class="bg-white w-5/6 lg:w-4/5 2xl:w-1/2 h-72 mx-auto my-8">
      <iframe class="w-full h-full" src={url} />
    </div>
  );
};

export { ChartIframe };
