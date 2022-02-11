// add middlewares here related to projects
const { OPEN_READWRITE } = require("sqlite3");
const { get } = require("./projects-model");

function getProjectById(req, res, next) {
  const { id } = req.params;

  get(id)
    .then((project) => {
      if (project) {
        req.project = project;
        console.log(req.project);
        next();
      } else {
        next({ status: 404, message: `Project ${id} not found` });
      }
    })
    .catch(next);
}

function checkProjectPayload(req, res, next) {
  if (req.body.name && req.body.description) {
    next();
  } else if (!req.body.name || !req.body.description || !req.body.completed) {
    next({
      status: 400,
      message: "Name and description are required fields",
    });
  } else {
    next({ status: 500, message: "something went wrong" });
  }
}

module.exports = { getProjectById, checkProjectPayload };
