import React from "react";

const ItemCard = ({ img, alt, price }) => {
  return (
    <div class="pb-4">
      <img src={img} alt={alt} class="w-20" />
      <p class="text-xs md:text-base">{price}</p>
    </div>
  );
};

export { ItemCard };
