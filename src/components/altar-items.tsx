import React from "react";

import chest from "../images/chest.png";
import air from "../images/air_rune.png";
import earth from "../images/earth_rune.png";
import water from "../images/water_rune.png";
import fire from "../images/fire_rune.png";
import { ItemCard } from "./";

const containerStyles = {
  backgroundColor: "#8954A8",
};

const AltarItems = () => {
  return (
    <div
      class="flex flex-col text-center items-center w-full md:w-4/5 xl:w-3/5 2xl:w-1/2 mx-auto my-8"
      style={containerStyles}
    >
      <h1 class="p-4 text-lg">Altar Item Floors</h1>
      <div class="flex w-full justify-around">
        <ItemCard img={chest} alt="a treasure chest" />
        <ItemCard img={air} alt="air rune" />
        <ItemCard img={earth} alt="earth rune" />
        <ItemCard img={water} alt="water rune" />
        <ItemCard img={fire} alt="fire rune" />
      </div>
    </div>
  );
};

export { AltarItems };
