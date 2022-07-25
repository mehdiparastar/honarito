const db = require("./db/db")

const port = process.env.basePORT || 3001

db.initDbConnection()
    .then(out => {
        console.log("Connected to MongoDB")

        const server = require("./app");
        server.listen(port, () => {
            console.log(`Server started on port ${port}...`)
        })
        server.on("error", err => {
            console.log('server Err', err)
        })
    })
    .catch(ex => {
        console.log('mongoDB connection Err', ex)
    })


