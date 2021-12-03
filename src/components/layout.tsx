import React from "react";
import { container } from "./layout.module.css";

const Layout = ({ pageTitle, children }) => {
  return (
    <div className={container}>
      <title>{pageTitle}</title>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
