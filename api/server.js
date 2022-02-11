const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const projectRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan("tiny"));
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionsRouter);

server.use("*", (req, res) => {
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

module.exports = server;
