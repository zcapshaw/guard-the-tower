import React from "react";

const ItemCard = ({ img, alt, price, url }) => {
  return (
    <div class="pb-4">
      <a href={url} target="_blank">
        <img src={img} alt={alt} class="w-20" />
      </a>

      <a href={url} target="_blank" class="text-xs md:text-base underline">
        {price}
      </a>
    </div>
  );
};

export { ItemCard };
