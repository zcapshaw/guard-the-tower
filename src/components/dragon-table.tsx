import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const containerStyles = {
  backgroundColor: "#8954A8",
};

function createData(rank: number, price: number) {
  return { rank, price };
}

const rows = [
  createData(5, 0.8),
  createData(6, 0.9),
  createData(7, 1.1),
  createData(8, 5),
];

const DragonTable = () => {
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
