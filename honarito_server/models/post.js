const mongoose = require("mongoose");
const getConn = require("../db/getConn");
const dbNames = require("../db/dbNames");
const Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const dbName = dbNames.baseDB;
const conn = getConn(dbName);
//
const PostSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  originalImage: { type: String, required: true },
  compressedImage: { type: String, default: null },
  alt: { type: String, default: null },
  status: { type: String, default: "deactivated" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag", db: dbName }],
  category: [{ type: Schema.Types.ObjectId, ref: "Category", db: dbName }],
});
PostSchema.index({ title: "text", description: "text" });
PostSchema.plugin(timestamps);
// PostSchema.plugin(mongoosePaginate);
PostSchema.plugin(aggregatePaginate);

module.exports = conn.model("Post", PostSchema);
