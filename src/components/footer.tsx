import React from "react";

const containerStyles = {
  textAlign: "center",
  marginTop: "5rem",
};

const linkStyles = {
  color: "white",
};

const footnoteStyles = {
  fontSize: 12,
  marginTop: 18,
};

const codeStyles = {
  fontSize: 18,
};

const tipJarContainer = {
  backgroundColor: "#8954A8",
  width: "40rem",
  padding: "0.25rem",
  margin: "auto",
};

const Footer = () => {
  return (
    <div style={containerStyles}>
      <div style={tipJarContainer}>
        <p>
          🙏Tip Jar:{" "}
          <code style={codeStyles}>
            0x4047F19DE6dd9497fca2e7A64c121cC2c97B9B82
          </code>
        </p>
      </div>

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
      <p style={footnoteStyles}>
        Special thanks to{" "}
        <a
          style={linkStyles}
          href="https://twitter.com/turfnft"
          target="_blank"
        >
          @turfnft
        </a>{" "}
        for design inspiration
      </p>
    </div>
  );
};

export default Footer;
