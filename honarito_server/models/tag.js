const mongoose = require('mongoose')
const getConn = require('../db/getConn');
const dbNames = require('../db/dbNames')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const dbName = dbNames.baseDB
const conn = getConn(dbName)

const TagSchema = new Schema({
  title: { type: String, required: true },
  isTrend: { type: Boolean, required: true }
})
TagSchema.plugin(timestamps)
TagSchema.plugin(aggregatePaginate)

module.exports = conn.model('Tag', TagSchema)
