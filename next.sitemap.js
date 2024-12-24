/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://example.com", // 基础 URL
  generateRobotsTxt: true, // 是否生成 robots.txt
  exclude: ["/admin", "/private"], // 排除的 URL
  changefreq: "daily", // 默认更新频率
  priority: 0.7, // 默认优先级
  sitemapSize: 7000, // 单个 sitemap 的最大 URL 数量

  additionalPaths: async (config) => {
    try {
      // 静态路径
      const staticPaths = [
        { loc: "/about", lastmod: new Date().toISOString() },
      ];

      // 动态路径
      const response = await fetch("https://example.com/posts");
      const posts = await response.json();

      const dynamicPaths = posts.map((post) => ({
        loc: `/posts/${post.id}`,
        lastmod: post.lastmod || new Date().toISOString(),
        changefreq: "daily",
        priority: 0.7,
      }));

      // 分页路径
      const totalPages = 10; // 假设有 10 页
      const pagePaths = Array.from({ length: totalPages }, (_, i) => ({
        loc: `/posts/page/${i + 1}`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.7,
      }));

      return [...config, ...staticPaths, ...dynamicPaths, ...pagePaths];
    } catch (error) {
      console.error("Error generating additional paths:", error);
      return config; // 返回默认配置
    }
  },
};
