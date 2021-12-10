import React from "react";

const ItemCard = ({ img, alt }) => {
  return (
    <div class="pb-4">
      <img src={img} alt={alt} class="w-20" />
      <p class="text-xs md:text-base">0.09</p>
    </div>
  );
};

export { ItemCard };
