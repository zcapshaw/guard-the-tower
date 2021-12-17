import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  query,
  orderBy,
  limit,
  addDoc,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";

import chest from "../images/chest.png";
import air from "../images/air_rune.png";
import earth from "../images/earth_rune.png";
import water from "../images/water_rune.png";
import fire from "../images/fire_rune.png";
import magic from "../images/magic_rune.png";
import whip from "../images/whip.png";
import { ItemCard } from "./";

// Initialize Cloud Firestore through Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "guard-the-tower.firebaseapp.com",
  projectId: "guard-the-tower",
  storageBucket: "guard-the-tower.appspot.com",
  messagingSenderId: "651790840617",
  appId: "1:651790840617:web:686eef7a004db7b50ebd38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const containerStyles = {
  backgroundColor: "#8954A8",
};

const AltarItems = () => {
  const [chestPrice, setChestPrice] = useState("-");
  const [airPrice, setAirPrice] = useState("-");
  const [earthPrice, setEarthPrice] = useState("-");
  const [waterPrice, setWaterPrice] = useState("-");
  const [firePrice, setFirePrice] = useState("-");
  const [magicPrice, setMagicPrice] = useState("-");
  const [whipPrice, setWhipPrice] = useState("-");

  useEffect(() => {
    fetchData();
  }, [
    chestPrice,
    airPrice,
    earthPrice,
    waterPrice,
    firePrice,
    magicPrice,
    whipPrice,
  ]);

  const fetchData = async () => {
    const floorsRef = collection(db, "dragon_floors");
    const q = query(floorsRef, orderBy("timestamp", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setChestPrice(doc.data().chest_floor);
      setAirPrice(doc.data().air_rune_floor);
      setEarthPrice(doc.data().earth_rune_floor);
      setWaterPrice(doc.data().water_rune_floor);
      setFirePrice(doc.data().fire_rune_floor);
      setMagicPrice(doc.data().magic_rune_floor);
      setWhipPrice(doc.data().dragon_whip_floor);
    });
  };

  return (
    <div
      class="flex flex-col text-center items-center w-full md:w-4/5 xl:w-3/5 2xl:w-1/2 mx-auto my-8"
      style={containerStyles}
    >
      <h1 class="p-4 text-lg">Altar Item Floors</h1>
      <div class="flex w-full justify-around">
        <ItemCard
          img={magic}
          alt="a magic rune"
          price={magicPrice}
          url="https://opensea.io/assets/0xfa1a07056c48dcba4b5e9e71aacc6aa791a93929/7"
        />
        <ItemCard
          img={air}
          alt="air rune"
          price={airPrice}
          url="https://opensea.io/assets/0xfa1a07056c48dcba4b5e9e71aacc6aa791a93929/1"
        />
        <ItemCard
          img={earth}
          alt="earth rune"
          price={earthPrice}
          url="https://opensea.io/assets/0xfa1a07056c48dcba4b5e9e71aacc6aa791a93929/2"
        />
        <ItemCard
          img={water}
          alt="water rune"
          price={waterPrice}
          url="https://opensea.io/assets/0xfa1a07056c48dcba4b5e9e71aacc6aa791a93929/3"
        />
      </div>
      <div class="flex w-full justify-around">
        <ItemCard
          img={fire}
          alt="fire rune"
          price={firePrice}
          url="https://opensea.io/assets/0xfa1a07056c48dcba4b5e9e71aacc6aa791a93929/4"
        />
        <ItemCard
          img={chest}
          alt="a treasure chest"
          price={chestPrice}
          url="https://opensea.io/assets/0xfa1a07056c48dcba4b5e9e71aacc6aa791a93929/5"
        />
        <ItemCard
          img={whip}
          alt="dragon whip"
          price={whipPrice}
          url="https://opensea.io/assets/0xfa1a07056c48dcba4b5e9e71aacc6aa791a93929/6"
        />
      </div>
    </div>
  );
};

export { AltarItems };
