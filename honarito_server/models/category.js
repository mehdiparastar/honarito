const mongoose = require('mongoose')
const getConn = require('../db/getConn');
const dbNames=require('../db/dbNames')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const dbName = dbNames.baseDB
const conn = getConn(dbName)

const CategorySchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, default: null }
})
CategorySchema.plugin(timestamps)
CategorySchema.plugin(aggregatePaginate)

module.exports = conn.model('Category', CategorySchema)