import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import "@fontsource/press-start-2p";
import Layout from "../components/layout";
import DataCard from "../components/data-card";
import Footer from "../components/footer";

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
  const [floorPrice, setFloorPrice] = useState("-");
  const [gpPrice, setGpPrice] = useState("-");
  const [ethPrice, setEthPrice] = useState(0);
  const [mintCost, setMintCost] = useState("-");

  // fetch data from airtable
  const queryResults = useStaticQuery(graphql`
    query fetchData {
      allAirtable(sort: { order: ASC, fields: id }, limit: 1) {
        edges {
          node {
            data {
              timestamp
              wizard_floor
            }
          }
        }
      }
    }
  `);

  // fetch price data from CoinGecko API
  useEffect(() => {
    // fetch $GP price
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=wizards-and-dragons&vs_currencies=usd`
    )
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        // console.log(resultData["wizards-and-dragons"].usd.toFixed(3));
        setGpPrice(resultData["wizards-and-dragons"].usd.toFixed(3));
      });

    // fetch ETH price
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
    )
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        // console.log(Math.round(resultData.ethereum.usd));
        setEthPrice(Math.round(resultData.ethereum.usd));
      });

    // set the cost to mint a wizard based on current ETH and GP prices
    setMintCost(calculateMintCost(ethPrice, gpPrice));
  }, []);

  const calculateMintCost = (ethPrice, gpPrice) => {
    const gpPricePerMint = 36000;
    const mintCost = (gpPricePerMint * gpPrice) / ethPrice;
    return mintCost.toFixed(2);
  };

  //update state from queryResults
  useEffect((gpPrice) => {
    const data = queryResults.allAirtable.edges[0].node.data;
    console.log(data);
    setFloorPrice(data.wizard_floor);
  }, []);

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
          number={gpPrice}
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
