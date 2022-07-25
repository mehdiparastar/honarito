const dbUrls = {
    honaritoUrl: process.env.REPLICA_URL ? `${process.env.REPLICA_URL}/honarito?replicaSet=${process.env.REPLICA_NAME}` : "mongodb://127.0.0.1:27017",// "mongodb://127.0.0.1:30000,127.0.0.1:30001,127.0.0.1:30002/honarito?replicaSet=rs0",
}

console.log(dbUrls)

module.exports = dbUrls

