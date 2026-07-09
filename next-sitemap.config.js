/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://yahongtour.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
  },
  exclude: ["/admin/*", "/api/*", "/design-test"],
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    const priorities = {
      "/": 1.0,
      "/about": 0.8,
      "/modules/M04": 0.9,
      "/modules/M06": 0.9,
      "/modules/M10": 0.9,
      "/reservation": 0.9,
      "/faq": 0.7,
    };
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? 0.6,
      lastmod: new Date().toISOString(),
    };
  },
};

module.exports = config;
