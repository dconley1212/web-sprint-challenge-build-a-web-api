// add middlewares here related to projects
const { get } = require("./projects-model");

const getProjectById = (req, res, next) => {
  const { id } = req.params;

  get(id)
    .then((project) => {
      if (!project) {
        next({ status: 404, message: `Project ${id} not found` });
      } else {
        req.body = project;
        console.log(req.body);
        next();
      }
    })
    .catch(next);
};

const checkProjectPayload = (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    next({
      status: 400,
      message: "Name and description are required fields",
    });
  } else {
    console.log(req.body.name);
    console.log(req.body.description);
    next();
  }
};

module.exports = { getProjectById, checkProjectPayload };
