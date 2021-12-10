import React from "react";

const footnoteStyles = {
  fontSize: 12,
  marginTop: 18,
};

const tipJarContainer = {
  backgroundColor: "#8954A8",
};

const Footer = () => {
  return (
    <div class="text-center mt-16">
      <div
        class="w-screen md:w-max m-auto mb-4 p-4 flex-wrap"
        style={tipJarContainer}
      >
        <p class="text-sm md:text-lg">
          🙏💜 Donate $GP here:{" "}
          <code class="text-sm md:text-lg">
            0x4047F19DE6dd9497fca2e7A64c121cC2c97B9B82
          </code>
        </p>
      </div>

      <p>
        Feedback or ideas?{" "}
        <a
          class="text-white underline"
          href="https://twitter.com/zachcapshaw"
          target="_blank"
        >
          Tweet at me
        </a>
      </p>
      <p class="my-4 text-xs">
        Special thanks to{" "}
        <a
          class="text-white underline"
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

export { Footer };
