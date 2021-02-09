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
        siteUrl: "https://example.com"
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-189279883-1"
      }
    }
  ]
}
