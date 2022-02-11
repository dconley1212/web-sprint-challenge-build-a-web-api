const express = require("express");
const { OPEN_READWRITE } = require("sqlite3");
const { actionsById, checkActionsPayload } = require("./actions-middlware");
const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

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

router.post("/", async (req, res, next) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    return next({ status: 400, message: "Missing required fields" });
  }

  try {
    const actions = await Projects.getProjectActions(req.body.project_id);
    const newAction = await Actions.insert(req.body);
    actions.push(newAction);
    res.status(200).res.json(newAction);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
