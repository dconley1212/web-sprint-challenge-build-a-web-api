const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const projectRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(cors());
server.use(morgan("tiny"));
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionsRouter);

server.use("*", (req, res) => {
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

module.exports = server;
