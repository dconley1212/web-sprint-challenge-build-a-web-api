// add middlewares here related to projects
const { get } = require("./projects-model");

const getProjectById = (req, res, next) => {
  const { id } = req.params;

  get(id)
    .then((project) => {
      if (!project) {
        next({ status: 404, message: `Project ${id} not found` });
      } else {
        console.log(project);
        req.body = project;
        next();
      }
    })
    .catch(next);
};

const checkProjectPayload = (req, res, next) => {
  console.log(req.body);
  if (!req.body.name || !req.body.description) {
    next({
      status: 400,
      message: "Name and description are required fields",
    });
  } else {
    next();
  }
};

module.exports = { getProjectById, checkProjectPayload };
