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
  apiKey: "AIzaSyBQWdZ5H4BT23k0mfwbDG77oMCgNIt0cTk",
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

const DragonTable = () => {
  const [r5Price, setR5Price] = useState("-");
  const [r6Price, setR6Price] = useState("-");
  const [r7Price, setR7Price] = useState("-");
  const [r8Price, setR8Price] = useState("-");

  useEffect(() => {
    fetchData();
  }, [r5Price, r6Price, r7Price, r8Price]);

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
      console.log(r7Price);
    });
  };

  function createData(rank: number, price: number) {
    return { rank, price };
  }

  const rows = [
    createData(5, r5Price),
    createData(6, r6Price),
    createData(7, r7Price),
    createData(8, r8Price),
  ];
  return (
    <div
      style={containerStyles}
      class="flex justify-center w-full md:w-4/5 xl:w-3/5 2xl:w-1/2 mx-auto my-8"
    >
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow class="border-b">
              <TableCell align="center" class="text-white p-4">
                Dragon Rank
              </TableCell>
              <TableCell align="center" class="text-white">
                OpenSea Floor Price
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
                >
                  {row.rank}
                </TableCell>
                <TableCell align="center" class="text-white text-center">
                  {row.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default DragonTable;
