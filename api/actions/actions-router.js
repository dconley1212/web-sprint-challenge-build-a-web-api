const express = require("express");
const { OPEN_READWRITE } = require("sqlite3");
const { actionsById } = require("./actions-middlware");
const Actions = require("./actions-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.json([]);
      }
    })
    .catch(next);
});

router.get("/:id", actionsById, (req, res) => {
  res.status(200).json(req.body);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
