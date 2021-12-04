import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import "@fontsource/press-start-2p";
import Layout from "../components/layout";
import DataCard from "../components/data-card";
import Footer from "../components/footer";

console.log(process.env.AIRTABLE_API_KEY);

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
  marginBottom: 80,
};

const wrapperStyles = {
  display: "flex",
  justifyContent: "center",
  // backgroundColor: "red",
};

// markup
const IndexPage = () => {
  // fetch floor price
  const [floorPrice, setFloorPrice] = useState(0.5);
  // useEffect(() => {
  //   // get data from GitHub api
  //   console.log("asdfasdf");
  //   fetch(
  //     `https://api.opensea.io/collection/wizards-dragons-game-v2?format=api`
  //   )
  //     .then((response) => response.json())
  //     .then((resultData) => {
  //       setFloorPrice(resultData.collection.stats.floor_price);
  //       console.log("floorPrice");
  //     });
  // }, []);

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
          number="0.48"
          currency="ETH"
          footer="per 36,000 $GP"
          footerUrl="https://wnd.game/game"
        />
        <DataCard
          title="Price of $GP"
          number="0.07"
          currency="USD"
          footer="Uniswap"
          footerUrl="https://app.uniswap.org/#/swap?outputCurrency=0x38ec27c6f05a169e7ed03132bca7d0cfee93c2c5"
        />
      </div>
      <Footer />
    </Layout>
  );
};

export default IndexPage;
