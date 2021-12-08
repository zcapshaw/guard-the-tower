import React, { useState, useEffect } from "react";
import Web3 from "web3/dist/web3.min.js";

import "@fontsource/press-start-2p";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Layout from "../components/layout";
import DataCard from "../components/data-card";
import Footer from "../components/footer";
import ChartIframe from "../components/chart-iframe";

// markup
const IndexPage = () => {
  const [floorPrice, setFloorPrice] = useState("-");
  const [gpPrice, setGpPrice] = useState("-");
  const [gpDisplayPrice, setGpDisplayPrice] = useState("-");
  const [ethPrice, setEthPrice] = useState(0);
  const [mintCost, setMintCost] = useState("-");
  const [mintsRemaining, setMintsRemaining] = useState("-");
  const [epoch, setEpoch] = useState(3);

  const epochText = `Epoch ${epoch} Countdown`;
  const providerUrl = process.env.PROVIDER_URL;

  const web3 = new Web3(providerUrl);

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
    setMintCost(calculateMintCost(ethPrice, gpPrice));
    fetchTotalTokenCount();
    fetchFloorData();
  }, [gpPrice, ethPrice, floorPrice, epoch, mintsRemaining]);

  const fetchFloorData = () => {
    fetch(
      `https://api.opensea.io/api/v1/collection/wizards-dragons-game-v2/stats`
    )
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        setFloorPrice(resultData.stats.floor_price.toFixed(3));
      });
  };

  const fetchTotalTokenCount = async () => {
    let pendingMints;

    // define the contract interface
    const ABI = [
      {
        inputs: [],
        name: "minted",
        outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
        stateMutability: "view",
        type: "function",
      },
    ];

    // Instantiate minting contract object
    const contract = new web3.eth.Contract(
      ABI,
      "0x999e88075692bCeE3dBC07e7E64cD32f39A1D3ab"
    );

    // fetch totalMinted
    const totalMinted = await contract.methods
      .minted()
      .call((error, result) => {
        // console.log(result);
      });

    // fetch pending mints from contract and calculate total number
    web3.eth
      .getStorageAt("0x1c5194668faab6a895b1febbf3dc219077cdd732", 8)
      .then((result) => {
        const pendingMints = parseInt(result.slice(58, 62), 16);
        const totalTokens = pendingMints + parseInt(totalMinted);
        // console.log(pendingMints);
        // console.log(totalTokens);
        countdownCalculator(totalTokens);
      });
  };

  const countdownCalculator = (tokenCount) => {
    if (tokenCount < 42000) {
      setEpoch(3);
      setMintsRemaining(42000 - tokenCount);
    } else if (tokenCount < 51000) {
      setEpoch(4);
      setMintsRemaining(51000 - tokenCount);
    } else if (tokenCount < 60000) {
      setEpoch(5);
      setMintsRemaining(60000 - tokenCount);
    }
  };

  const calculateMintCost = (ethPrice, gpPrice) => {
    const gpPricePerMint = 60000;
    const mintCost = (gpPricePerMint * gpPrice) / ethPrice;
    return mintCost.toFixed(2);
  };

  return (
    <Layout pageTitle="!guard">
      <div class="text-center">
        <h1 class="mt-10 mb-4 text-3xl">!GUARD THE TOWER</h1>
        <p class="mb-4">A dashboard for Wizards & Dragons Game</p>
        <h1 class="text-6xl mb-8">🧙‍♂️🐉</h1>
      </div>
      <div class="flex justify-center w-full md:w-4/5 xl:w-3/5 2xl:w-1/2 m-auto">
        <DataCard
          emoji="🧹"
          title="Wizard Floor Price"
          number={floorPrice}
          currency="ETH"
          footer="OpenSea"
          footerUrl="https://opensea.io/collection/wizards-dragons-game-v2?search[sortAscending]=true&search[sortBy]=PRICE&search[toggles][0]=BUY_NOW"
        />

        <DataCard
          emoji="✨"
          title="$GP Mint Cost "
          number={mintCost}
          currency="ETH"
          footer="per 60,000 $GP"
          footerUrl="https://wnd.game/game"
          hasTooltip="true"
        />
      </div>
      <div class="flex justify-center w-full md:w-4/5 xl:w-3/5 2xl:w-1/2 m-auto">
        {" "}
        <DataCard
          emoji="📈"
          title="Price of $GP"
          number={gpDisplayPrice}
          currency="USD"
          footer="Uniswap"
          footerUrl="https://app.uniswap.org/#/swap?outputCurrency=0x38ec27c6f05a169e7ed03132bca7d0cfee93c2c5"
        />
        <DataCard
          emoji="⏳"
          title={epochText}
          number={mintsRemaining}
          footer="mints remaining"
        />
      </div>
      <ChartIframe url="https://dune.xyz/embeds/275555/519579/ff68320a-d4c2-4814-aba6-7e98f463a62a" />
      <Footer />
    </Layout>
  );
};

export default IndexPage;
