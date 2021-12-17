import React from "react";

const ItemCard = ({ img, alt, price, url }) => {
  return (
    <div class="m-4 sm:mx-12">
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
