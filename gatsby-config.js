require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "guard-the-tower",
    description: "A dashboard for the Wizards and Dragons Game",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Guard the Tower`,
        short_name: `!guard`,
        start_url: `/`,
        icon: `src/images/wizard.png`,
      },
    },
    {
      resolve: "gatsby-source-airtable",
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: "appPcI9Wmam3nbCjc",
            tableName: "WND_DATA",
          },
        ],
      },
    },
  ],
};
