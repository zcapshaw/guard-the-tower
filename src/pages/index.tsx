import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import "@fontsource/press-start-2p";
import Layout from "../components/layout";
import DataCard from "../components/data-card";
import Footer from "../components/footer";
import ChartIframe from "../components/chart-iframe";

// styles
const pageStyles = {
  color: "#fff",
  padding: 80,
};
const headingStyles = {
  marginTop: 64,
  marginBottom: 32,
};

const paragraphStyles = {
  marginBottom: 20,
};

const containerStyles = {
  margin: 0,
  textAlign: "center",
};

const emojiStyles = {
  fontSize: 50,
  marginBottom: 24,
};

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
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2C%20wizards-and-dragons&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    )
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        setEthPrice(resultData[0].current_price);
        setGpPrice(resultData[1].current_price);
        // error handling if the api fails to return
        if (gpPrice != "-") {
          setGpDisplayPrice(gpPrice.toFixed(3));
        }
      });

    // set the cost to mint a wizard based on current ETH and GP prices
    setMintCost(calculateMintCost(ethPrice, gpPrice));
  }, []);

  // fetch opensea floor
  useEffect(() => {
    // fetch ETH and $GP price
    fetch(
      `https://api.opensea.io/api/v1/collection/wizards-dragons-game-v2/stats`
    )
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        // console.log(resultData.stats.floor_price);
        setFloorPrice(resultData.stats.floor_price);
      });
  }, []);

  const calculateMintCost = (ethPrice, gpPrice) => {
    const gpPricePerMint = 36000;
    const mintCost = (gpPricePerMint * gpPrice) / ethPrice;
    return mintCost.toFixed(2);
  };

  return (
    <Layout pageTitle="!guard">
      <div style={containerStyles}>
        <h1 style={headingStyles}>!GUARD THE TOWER</h1>
        <p style={paragraphStyles}>A dashboard for Wizards & Dragons Game</p>
        <h1 style={emojiStyles}>🧙‍♂️🐉</h1>
      </div>
      <div style={wrapperStyles}>
        <DataCard
          title="Wizard Floor Price"
          number={floorPrice}
          currency="ETH"
          footer="OpenSea"
          footerUrl="https://opensea.io/collection/wizards-dragons-game-v2?search[sortAscending]=true&search[sortBy]=PRICE&search[toggles][0]=BUY_NOW"
        />
        <DataCard
          title="$GP Mint Cost"
          number={mintCost}
          currency="ETH"
          footer="per 36,000 $GP"
          footerUrl="https://wnd.game/game"
        />
        <DataCard
          title="Price of $GP"
          number={gpDisplayPrice}
          currency="USD"
          footer="Uniswap"
          footerUrl="https://app.uniswap.org/#/swap?outputCurrency=0x38ec27c6f05a169e7ed03132bca7d0cfee93c2c5"
        />
      </div>
      <ChartIframe />
      <Footer />
    </Layout>
  );
};

export default IndexPage;
