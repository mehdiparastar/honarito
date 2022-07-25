const mongoose = require('mongoose')

function getConn(dbName) {
    return mongoose.connections.filter(item => item.name === dbName)[0]
}

module.exports = getConn