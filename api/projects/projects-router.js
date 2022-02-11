const express = require("express");
const {
  getProjectById,
  checkProjectPayload,
} = require("./projects-middleware");
const Projects = require("./projects-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  const { id } = req.params;
  Projects.get(id)
    .then((projects) => {
      if (!projects) {
        res.json([]);
      } else {
        res.status(200).json(projects);
      }
    })
    .catch(next);
});

router.get("/:id", getProjectById, (req, res) => {
  res.json(req.project);
});

router.post("/", checkProjectPayload, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

router.put("/:id", getProjectById, checkProjectPayload, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((project) => {
      console.log(project);
      res.status(200).json(project);
    })
    .catch(next);
});

router.delete("/:id", getProjectById, (req, res, next) => {
  const { id } = req.params;

  Projects.remove(id)
    .then((project) => res.status(200).json(project))
    .catch(next);
});

router.get("/:id/actions", getProjectById, (req, res, next) => {
  const { id } = req.params;

  Projects.getProjectActions(id)
    .then((actions) => res.status(200).json(actions))
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
