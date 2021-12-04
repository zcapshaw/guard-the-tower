import React from "react";

const containerStyles = {
  textAlign: "center",
  position: "absolute",
  bottom: 75,
  height: "2.5rem",
  width: "100%",
};

const linkStyles = {
  color: "white",
};

const Footer = () => {
  return (
    <div style={containerStyles}>
      <p>
        🙏Tip Jar: <code>0x4047F19DE6dd9497fca2e7A64c121cC2c97B9B82</code>
      </p>
      <p>
        Feedback or ideas?{" "}
        <a
          style={linkStyles}
          href="https://twitter.com/zachcapshaw"
          target="_blank"
        >
          Tweet at me
        </a>
      </p>
    </div>
  );
};

export default Footer;
