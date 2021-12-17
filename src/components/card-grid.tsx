import React, { useState, useEffect } from "react";
import Web3 from "web3/dist/web3.min.js";

import { DataCard } from "./data-card";
import gen0 from "../images/gen0-wizard.png";
import gen1 from "../images/gen1-wizard.png";

const CardGrid = () => {
  const [floorPrice, setFloorPrice] = useState("-");
  const [gpPrice, setGpPrice] = useState("-");
  const [gpDisplayPrice, setGpDisplayPrice] = useState("-");
  const [ethPrice, setEthPrice] = useState(0);

  const isBrowser = typeof window !== "undefined";

  const web3 = new Web3(
    "https://mainnet.infura.io/v3/67a52ac8afec4c43bdc567d617a4302b"
  );

  // fetch price data from CoinGecko API
  useEffect(() => {
    // fetch ETH and $GP price
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2C%20wizards-and-dragons&order=market_cap_desc`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((resultData) => {
        setEthPrice(resultData[0].current_price);
        setGpPrice(resultData[1].current_price);
        // error handling if the api fails to return
        if (gpPrice != "-") {
          setGpDisplayPrice(gpPrice.toFixed(3));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // set the cost to mint a wizard based on current ETH and GP prices
    fetchFloorData();
  }, [gpPrice, ethPrice, floorPrice]);

  const fetchFloorData = () => {
    fetch(
      `https://api.opensea.io/api/v1/collection/wizards-dragons-game-v2/stats`
    )
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        setFloorPrice(resultData.stats.floor_price.toFixed(3));
      });
  };

  // const fetchTotalTokenCount = async () => {
  //   let pendingMints;

  //   // define the contract interface
  //   const ABI = [
  //     {
  //       inputs: [],
  //       name: "minted",
  //       outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
  //       stateMutability: "view",
  //       type: "function",
  //     },
  //   ];

  //   // Instantiate minting contract object
  //   const contract = new web3.eth.Contract(
  //     ABI,
  //     "0x999e88075692bCeE3dBC07e7E64cD32f39A1D3ab"
  //   );

  //   // fetch totalMinted
  //   const totalMinted = await contract.methods
  //     .minted()
  //     .call((error, result) => {
  //       // console.log(result);
  //     });

  //   // fetch pending mints from contract and calculate total number
  //   web3.eth
  //     .getStorageAt("0x1c5194668faab6a895b1febbf3dc219077cdd732", 8)
  //     .then((result) => {
  //       const pendingMints = parseInt(result.slice(58, 62), 16);
  //       const totalTokens = pendingMints + parseInt(totalMinted);
  //       // console.log(pendingMints);
  //       // console.log(totalTokens);
  //       countdownCalculator(totalTokens);
  //     });
  // };

  return (
    <div>
      <div class="flex justify-center w-full md:w-4/5 xl:w-3/5 2xl:w-1/2 m-auto">
        <DataCard
          img={gen1}
          title="Gen 1 Wizard Floor"
          number={floorPrice}
          currency="ETH"
          footer="OpenSea"
          footerUrl="https://opensea.io/collection/wizards-dragons-game-v2?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Generation&search[stringTraits][0][values][0]=Gen%201&search[toggles][0]=BUY_NOW"
        />
        <DataCard
          img={gen0}
          title="Gen 0 Wizard Floor"
          number={floorPrice}
          currency="ETH"
          footer="OpenSea"
          footerUrl="https://opensea.io/collection/wizards-dragons-game-v2?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Generation&search[stringTraits][0][values][0]=Gen%200&search[toggles][0]=BUY_NOW"
        />
        <DataCard
          emoji="📈"
          title="Price of $GP"
          number={gpDisplayPrice}
          currency="USD"
          footer="Uniswap"
          footerUrl="https://app.uniswap.org/#/swap?outputCurrency=0x38ec27c6f05a169e7ed03132bca7d0cfee93c2c5"
        />
      </div>
    </div>
  );
};

export default CardGrid;
