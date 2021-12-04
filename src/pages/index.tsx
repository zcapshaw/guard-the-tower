import * as React from "react";
import "@fontsource/press-start-2p";
import Layout from "../components/layout";
import DataCard from "../components/data-card";

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
  fontSize: 32,
  marginBottom: 80,
};

const wrapperStyles = {
  display: "flex",
  justifyContent: "center",
  // backgroundColor: "red",
};

// markup
const IndexPage = () => {
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
          number="0.45 ETH"
          footer="per 36,000 $GP"
          footer="OpenSea"
        />
        <DataCard
          title="$GP Mint Cost"
          number="0.48 ETH"
          footer="per 36,000 $GP"
        />
        <DataCard title="Price of $GP" number="0.07 USD" footer="Uniswap" />
      </div>
    </Layout>
  );
};

export default IndexPage;
