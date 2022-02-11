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
  try {
    const actions = await Projects.getProjectActions(req.body.project_id);
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
      return next({ status: 400, message: "Missing required fields" });
    }

    const newAction = await Actions.insert(req.body);
    actions.push(newAction);
    res.status(200).json(newAction);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const actionById = await Actions.get(id);
    const updatedAction = await Actions.update(id, req.body);
    if (!actionById) {
      next({ status: 404, message: `Action ${id} not found` });
    } else if (
      !req.body.project_id ||
      !req.body.description ||
      !req.body.notes
    ) {
      next({ status: 400, message: "Missing required fields" });
    } else {
      res.status(200).json(updatedAction);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", actionsById, (req, res, next) => {
  const { id } = req.params;
  Actions.remove(id)
    .then((action) => res.status(200).json(action))
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
