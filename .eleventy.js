module.exports = function (eleventyConfig) {
  // Statische assets meenemen naar _site
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("favicon-48x48.png");
  eleventyConfig.addPassthroughCopy("favicon-64x64.png");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("og-image.png");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("admin");

  // Build-datum (voor sitemap lastmod)
  eleventyConfig.addGlobalData("buildDate", () => new Date().toISOString().split("T")[0]);
  eleventyConfig.addPassthroughCopy("logo-pakket");
  eleventyConfig.addPassthroughCopy("logo-pakket-juke.zip");

  // Prijzen netjes formatteren: "12,50" → "12,50", "12.5" → "12,50"
  eleventyConfig.addFilter("prijs", function (value) {
    if (value === null || value === undefined || value === "") return "";
    let s = String(value).replace(",", ".");
    let n = Number(s);
    if (isNaN(n)) return String(value);
    return n.toFixed(2).replace(".", ",");
  });

  // Zoek een menu-sectie op titel (case-insensitive, accent-tolerant)
  // Gebruik: {{ menu.secties | sectie("Voor bij de koffie") }}
  eleventyConfig.addFilter("sectie", function (secties, titel) {
    if (!Array.isArray(secties) || !titel) return null;
    const norm = (s) => String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .trim();
    const target = norm(titel);
    return secties.find((s) => norm(s.titel) === target) || null;
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "html", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
