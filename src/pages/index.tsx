import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import "@fontsource/press-start-2p";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Layout from "../components/layout";
import DataCard from "../components/data-card";
import Footer from "../components/footer";
import ChartIframe from "../components/chart-iframe";

const wrapperStyles = {
  display: "flex",
  justifyContent: "center",
  // backgroundColor: "red",
};

// markup
const IndexPage = () => {
  const [floorPrice, setFloorPrice] = useState("-");
  const [gpPrice, setGpPrice] = useState("-");
  const [gpDisplayPrice, setGpDisplayPrice] = useState("-");
  const [ethPrice, setEthPrice] = useState(0);
  const [mintCost, setMintCost] = useState("-");

  // fetch price data from CoinGecko API
  useEffect(() => {
    // fetch ETH and $GP price
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2C%20wizards-and-dragons&order=market_cap_desc`
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((resultData) => {
        console.log(resultData);
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
    console.log(gpPrice, ethPrice);
  }, [gpPrice, ethPrice]);

  // fetch opensea floor
  useEffect(() => {
    // fetch ETH and $GP price
    fetch(
      `https://api.opensea.io/api/v1/collection/wizards-dragons-game-v2/stats`
    )
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        // console.log(resultData.stats.floor_price);
        setFloorPrice(resultData.stats.floor_price.toFixed(3));
      });
  }, []);

  const calculateMintCost = (ethPrice, gpPrice) => {
    const gpPricePerMint = 48000;
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
          footer="per 48,000 $GP"
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
          title="Epoch 3 Countdown"
          number="2031"
          footer="mints remaining"
        />
      </div>
      <ChartIframe url="https://dune.xyz/embeds/275555/519579/6962b8d0-997d-4440-a074-df47d1dc10e2" />
      <Footer />
    </Layout>
  );
};

export default IndexPage;
