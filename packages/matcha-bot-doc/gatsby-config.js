const path = require("path")

module.exports = {
  plugins: [
    {
      resolve: "smooth-doc",
      options: {
        name: "MatchBot",
        title: "MatchaBot",
        author: "Raphaël MANSUY | Elitizon Ltd",
        navItems: [{ title: "Docs", url: "/docs/" }],
        githubRepositoryURL: "https://github.com/matchabot/matcha-bot",
        description:
          "A powerful project code generator, simple and fun to use. Improve your daily productivity for your React, Gatsby and NextJS projects.",
        siteUrl: "https://www.matchabot.site",
        baseDirectory: path.resolve(__dirname, "../"),
        sections: ["Introduction","Credits"],
        twitterAccount: "raphaelmansuy"
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-189279883-1"
      }
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        resolveSiteUrl: ({ site, allSitePage }) => {
          //Alternatively, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
          return "https://www.matchabot.site"
        }
      }
    }
  ]
}
