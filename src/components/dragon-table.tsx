import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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

const textStyles = {
  color: "white",
  fontFamily: "Press Start 2P !important" as any,
};

const DragonTable = () => {
  const [r5Price, setR5Price] = useState("-");
  const [r6Price, setR6Price] = useState("-");
  const [r7Price, setR7Price] = useState("-");
  const [r8Price, setR8Price] = useState("-");
  const [g0r5Price, setG0R5Price] = useState("-");
  const [g0r6Price, setG0R6Price] = useState("-");
  const [g0r7Price, setG0R7Price] = useState("-");
  const [g0r8Price, setG0R8Price] = useState("-");

  useEffect(() => {
    fetchData();
  }, [
    r5Price,
    r6Price,
    r7Price,
    r8Price,
    g0r5Price,
    g0r6Price,
    g0r7Price,
    g0r8Price,
  ]);

  // query firestore for floor data
  const fetchData = async () => {
    const floorsRef = collection(db, "dragon_floors");
    const q = query(floorsRef, orderBy("timestamp", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      // console.log(doc.data().level_5_floor);
      setR5Price(doc.data().level_5_floor);
      setR6Price(doc.data().level_6_floor);
      setR7Price(doc.data().level_7_floor);
      setR8Price(doc.data().level_8_floor);
      setG0R5Price(doc.data().gen0_level_5_floor);
      setG0R6Price(doc.data().gen0_level_6_floor);
      setG0R7Price(doc.data().gen0_level_7_floor);
      setG0R8Price(doc.data().gen0_level_8_floor);
    });
  };

  function createData(
    rank: number,
    gen0Price: number,
    gen0url: string,
    gen1Price: number,
    gen1url: string
  ) {
    return { rank, gen0Price, gen0url, gen1Price, gen1url };
  }

  const rows = [
    createData(
      5,
      g0r5Price,
      "https://opensea.io/assets/wizards-dragons-game-v2?search%5BsortAscending%5D=true&search%5BsortBy%5D=PRICE&search%5BstringTraits%5D%5B0%5D%5Bname%5D=Type&search%5BstringTraits%5D%5B0%5D%5Bvalues%5D%5B0%5D=Dragon&search%5BstringTraits%5D%5B1%5D%5Bname%5D=Rank%20Score&search%5BstringTraits%5D%5B1%5D%5Bvalues%5D%5B0%5D=5&search%5BstringTraits%5D%5B2%5D%5Bname%5D=Generation&search%5BstringTraits%5D%5B2%5D%5Bvalues%5D%5B0%5D=Gen%200&search%5Btoggles%5D%5B0%5D=BUY_NOW",
      r5Price,
      "https://opensea.io/assets/wizards-dragons-game-v2?search%5BsortAscending%5D=true&search%5BsortBy%5D=PRICE&search%5BstringTraits%5D%5B0%5D%5Bname%5D=Type&search%5BstringTraits%5D%5B0%5D%5Bvalues%5D%5B0%5D=Dragon&search%5BstringTraits%5D%5B1%5D%5Bname%5D=Rank%20Score&search%5BstringTraits%5D%5B1%5D%5Bvalues%5D%5B0%5D=5&search%5BstringTraits%5D%5B2%5D%5Bname%5D=Generation&search%5BstringTraits%5D%5B2%5D%5Bvalues%5D%5B0%5D=Gen%201&search%5Btoggles%5D%5B0%5D=BUY_NOW"
    ),
    createData(
      6,
      g0r6Price,
      "https://opensea.io/assets/wizards-dragons-game-v2?search%5BsortAscending%5D=true&search%5BsortBy%5D=PRICE&search%5BstringTraits%5D%5B0%5D%5Bname%5D=Type&search%5BstringTraits%5D%5B0%5D%5Bvalues%5D%5B0%5D=Dragon&search%5BstringTraits%5D%5B1%5D%5Bname%5D=Rank%20Score&search%5BstringTraits%5D%5B1%5D%5Bvalues%5D%5B0%5D=6&search%5BstringTraits%5D%5B2%5D%5Bname%5D=Generation&search%5BstringTraits%5D%5B2%5D%5Bvalues%5D%5B0%5D=Gen%200&search%5Btoggles%5D%5B0%5D=BUY_NOW",
      r6Price,
      "https://opensea.io/assets/wizards-dragons-game-v2?search%5BsortAscending%5D=true&search%5BsortBy%5D=PRICE&search%5BstringTraits%5D%5B0%5D%5Bname%5D=Type&search%5BstringTraits%5D%5B0%5D%5Bvalues%5D%5B0%5D=Dragon&search%5BstringTraits%5D%5B1%5D%5Bname%5D=Generation&search%5BstringTraits%5D%5B1%5D%5Bvalues%5D%5B0%5D=Gen%201&search%5BstringTraits%5D%5B2%5D%5Bname%5D=Rank%20Score&search%5BstringTraits%5D%5B2%5D%5Bvalues%5D%5B0%5D=6&search%5Btoggles%5D%5B0%5D=BUY_NOW"
    ),
    createData(
      7,
      g0r7Price,
      "https://opensea.io/assets/wizards-dragons-game-v2?search%5BsortAscending%5D=true&search%5BsortBy%5D=PRICE&search%5BstringTraits%5D%5B0%5D%5Bname%5D=Type&search%5BstringTraits%5D%5B0%5D%5Bvalues%5D%5B0%5D=Dragon&search%5BstringTraits%5D%5B1%5D%5Bname%5D=Rank%20Score&search%5BstringTraits%5D%5B1%5D%5Bvalues%5D%5B0%5D=7&search%5BstringTraits%5D%5B2%5D%5Bname%5D=Generation&search%5BstringTraits%5D%5B2%5D%5Bvalues%5D%5B0%5D=Gen%200&search%5Btoggles%5D%5B0%5D=BUY_NOW",
      r7Price,
      "https://opensea.io/assets/wizards-dragons-game-v2?search%5BsortAscending%5D=true&search%5BsortBy%5D=PRICE&search%5BstringTraits%5D%5B0%5D%5Bname%5D=Type&search%5BstringTraits%5D%5B0%5D%5Bvalues%5D%5B0%5D=Dragon&search%5BstringTraits%5D%5B1%5D%5Bname%5D=Generation&search%5BstringTraits%5D%5B1%5D%5Bvalues%5D%5B0%5D=Gen%201&search%5BstringTraits%5D%5B2%5D%5Bname%5D=Rank%20Score&search%5BstringTraits%5D%5B2%5D%5Bvalues%5D%5B0%5D=7&search%5Btoggles%5D%5B0%5D=BUY_NOW"
    ),
    createData(
      8,
      g0r8Price,
      "https://opensea.io/assets/wizards-dragons-game-v2?search%5BsortAscending%5D=true&search%5BsortBy%5D=PRICE&search%5BstringTraits%5D%5B0%5D%5Bname%5D=Type&search%5BstringTraits%5D%5B0%5D%5Bvalues%5D%5B0%5D=Dragon&search%5BstringTraits%5D%5B1%5D%5Bname%5D=Rank%20Score&search%5BstringTraits%5D%5B1%5D%5Bvalues%5D%5B0%5D=8&search%5BstringTraits%5D%5B2%5D%5Bname%5D=Generation&search%5BstringTraits%5D%5B2%5D%5Bvalues%5D%5B0%5D=Gen%200&search%5Btoggles%5D%5B0%5D=BUY_NOW",
      r8Price,
      "https://opensea.io/assets/wizards-dragons-game-v2?search%5BsortAscending%5D=true&search%5BsortBy%5D=PRICE&search%5BstringTraits%5D%5B0%5D%5Bname%5D=Type&search%5BstringTraits%5D%5B0%5D%5Bvalues%5D%5B0%5D=Dragon&search%5BstringTraits%5D%5B1%5D%5Bname%5D=Generation&search%5BstringTraits%5D%5B1%5D%5Bvalues%5D%5B0%5D=Gen%201&search%5BstringTraits%5D%5B2%5D%5Bname%5D=Rank%20Score&search%5BstringTraits%5D%5B2%5D%5Bvalues%5D%5B0%5D=8&search%5Btoggles%5D%5B0%5D=BUY_NOW"
    ),
  ];

  return (
    <div
      style={containerStyles}
      class="container flex justify-center w-full md:w-4/5 xl:w-3/5 2xl:w-1/2 mx-auto my-8"
    >
      <TableContainer class="text-white container">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow class="border-b">
              <TableCell
                align="center"
                class="text-white p-4"
                style={textStyles}
                sx={{ fontFamily: "'Press Start 2P' !important" }}
              >
                Dragon Rank
              </TableCell>
              <TableCell
                align="center"
                class="text-white"
                style={textStyles}
                sx={{ fontFamily: "'Press Start 2P' !important" }}
              >
                Gen 0 Floor
              </TableCell>
              <TableCell
                align="center"
                class="text-white"
                style={textStyles}
                sx={{ fontFamily: "'Press Start 2P' !important" }}
              >
                Gen 1 Floor
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.rank} class="border-b">
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  class="text-white p-2 border-white border-opacity-100"
                  style={textStyles}
                  sx={{ fontFamily: "'Press Start 2P' !important" }}
                >
                  {row.rank}
                </TableCell>
                <TableCell
                  align="center"
                  class="text-white text-center underline"
                  style={textStyles}
                  sx={{ fontFamily: "'Press Start 2P' !important" }}
                >
                  <a href={row.gen0url} target="_blank">
                    {row.gen0Price}
                  </a>
                </TableCell>
                <TableCell
                  align="center"
                  class="text-white text-center underline"
                  style={textStyles}
                  sx={{ fontFamily: "'Press Start 2P' !important" }}
                >
                  <a href={row.gen1url} target="_blank">
                    {row.gen1Price}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export { DragonTable };
