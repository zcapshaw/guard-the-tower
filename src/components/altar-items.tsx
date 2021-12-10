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

  useEffect(() => {
    fetchData();
  }, [chestPrice, airPrice, earthPrice, waterPrice, firePrice]);

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
    });
  };

  return (
    <div
      class="flex flex-col text-center items-center w-full md:w-4/5 xl:w-3/5 2xl:w-1/2 mx-auto my-8"
      style={containerStyles}
    >
      <h1 class="p-4 text-lg">Altar Item Floors</h1>
      <div class="flex w-full justify-around">
        <ItemCard img={chest} alt="a treasure chest" price={chestPrice} />
        <ItemCard img={air} alt="air rune" price={airPrice} />
        <ItemCard img={earth} alt="earth rune" price={earthPrice} />
        <ItemCard img={water} alt="water rune" price={waterPrice} />
        <ItemCard img={fire} alt="fire rune" price={firePrice} />
      </div>
    </div>
  );
};

export { AltarItems };
