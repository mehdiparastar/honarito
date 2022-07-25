const PostModel = require("../models/post");
const CategoryModel = require("../models/category");
const TagModel = require("../models/tag");

async function initializing() {
  await PostModel.deleteMany();
  await TagModel.deleteMany();
  await CategoryModel.deleteMany();

  const tagsInitial = await TagModel.insertMany(
    Array(100)
      .fill()
      .map((_, idx) => 1 + idx)
      .map((item) => ({
        title: `Tag${item}`,
        isTrend: Boolean(item % 2),
      })),
    { upsert: true }
  );

  const categoriesInitial = await CategoryModel.insertMany(
    Array(20)
      .fill()
      .map((_, idx) => 1 + idx)
      .map((item) => ({
        title: `Cat${item}`,
        image: `Img${item}`,
      })),
    { upsert: true }
  );

  const tagsSampleList = await Promise.all(
    Array(4000)
      .fill()
      .map((_, idx) => 1 + idx)
      .map((item) =>
        TagModel.find()
          .skip(Math.floor(Math.random() * (90 - 1 + 1) + 1))
          .limit(Math.floor(Math.random() * (10 - 1 + 1) + 1))
      )
  );

  const categorySampleList = await Promise.all(
    Array(4000)
      .fill()
      .map((_, idx) => 1 + idx)
      .map((item) =>
        TagModel.find()
          .skip(Math.floor(Math.random() * (15 - 1 + 1) + 1))
          .limit(Math.floor(Math.random() * (5 - 1 + 1) + 1))
      )
  );

  const postsInitial = await PostModel.insertMany(
    Array(4000)
      .fill()
      .map((_, idx) => 1 + idx)
      .map((item) => ({
        title: `Post${item}`,
        description: `Desc${item}`,
        originalImage: `OrgImg${item}`,
        compressedImage: `CompressedImg${item}`,
        alt: `Alt${item}`,
        status: ["activated", "deactivated"][item % 2],
        tags: tagsSampleList[item],
        category: categorySampleList[item],
      })),
    { upsert: true }
  );

  console.log("initializing completed.");
}

module.exports = initializing;
