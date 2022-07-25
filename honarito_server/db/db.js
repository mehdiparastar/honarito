const mongoose = require('mongoose');
const dbUrls = require('./dbURLs');


const clientOption = {
    socketTimeoutMS: 6000000,
    keepAlive: true,
    maxPoolSize: 10,
    autoIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
};

const initDbConnection = async () => {
    const allConnections = await Promise.all(
        Object.entries(dbUrls)
            .map(([dbName, dbUrl]) =>
                new Promise((resolve, reject) => {

                    const conn = mongoose.createConnection(dbUrl, clientOption)

                    conn.on("error", err => {
                        console.log(err)
                        reject(err)
                    });

                    conn.once("open", function () {
                        console.log(`client MongoDB Connection to ${dbName} ok!`);
                        resolve()
                    });
                })
                    .catch(e => e)
            )
    )
    return allConnections
}

module.exports = {
    initDbConnection
};