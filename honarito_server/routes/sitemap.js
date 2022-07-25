const express = require("express");
const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");
const { Readable } = require("stream");
const PostModel = require("../models/post");
const CategoryModel = require("../models/category");
const TagModel = require("../models/tag");

const router = express.Router();

let sitemap;

router.get("/sitemap.xml", async (req, res) => {
  res.header("Content-Type", "application/xml");
  res.header("Content-Encoding", "gzip");
  // if we have a cached entry send it
  if (sitemap) {
    res.send(sitemap);
    return;
  }

  try {
    const smStream = new SitemapStream({ hostname: "https://example.com/" });
    const pipeline = smStream.pipe(createGzip());

    // pipe your entries or directly write them.
    const allPosts = await PostModel.find().lean();
    for (let index = 0; index < allPosts.length; index++) {
      const item = allPosts[index];
      smStream.write({
        url: item.title,
        changefreq: ["daily", "monthly", "weekly"][(index + 1) % 3],
        priority: Math.random(),
      });
    }

    // smStream.write({ url: "/page-1/", changefreq: "daily", priority: 0.3 });
    // smStream.write({ url: "/page-2/", changefreq: "monthly", priority: 0.7 });
    // smStream.write({ url: "/page-3/" }); // changefreq: 'weekly',  priority: 0.5
    // smStream.write({ url: "/page-4/", img: "http://urlTest.com" });
    /* or use
    Readable.from([{url: '/page-1'}...]).pipe(smStream)
    if you are looking to avoid writing your own loop.
    */

    // cache the response
    streamToPromise(pipeline).then((sm) => (sitemap = sm));
    // make sure to attach a write stream such as streamToPromise before ending
    smStream.end();
    // stream write the response
    pipeline.pipe(res).on("error", (e) => {
      throw e;
    });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

module.exports = router;
