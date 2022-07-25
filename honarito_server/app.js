const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const morgan = require("morgan");
const initializing = require("./initializing/initialize");

const errorHandler = require("./middleWares/errorHandler");
const sitemapRoutes = require("./routes/sitemap");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(morgan("short"));

app.use("/api/", sitemapRoutes);

app.use(errorHandler); // it should placed after all middlewares...

initializing()

const io = socketIO(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("joinUser", async () => {
    console.log(socket.id, "joined");
  });

  socket.on("disconnect", async () => {
    console.log("user disconnected", socket.id);
  });
});

module.exports = server;
