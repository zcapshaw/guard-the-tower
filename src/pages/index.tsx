import React, { useState, useEffect } from "react";
import "@fontsource/press-start-2p";

import {
  AltarItems,
  Layout,
  DragonTable,
  Footer,
  ChartIframe,
  Chest,
} from "../components";

const ClientSideOnlyLazy = React.lazy(() => import("../components/card-grid"));

const IndexPage = () => {
  const isSSR = typeof window === "undefined";

  return (
    <Layout pageTitle="!guard">
      <div class="text-center">
        <h1 class="mt-10 mb-4 text-3xl">!GUARD THE TOWER</h1>
        <p class="mb-4 mx-4">A dashboard for Wizards & Dragons Game</p>
        <h1 class="text-6xl mb-8">🧙‍♂️🐉</h1>
      </div>

      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <ClientSideOnlyLazy />
        </React.Suspense>
      )}
      <DragonTable />
      <AltarItems />
      <ChartIframe url="https://dune.xyz/embeds/275555/519579/ff68320a-d4c2-4814-aba6-7e98f463a62a" />
      <Footer />
    </Layout>
  );
};

export default IndexPage;
