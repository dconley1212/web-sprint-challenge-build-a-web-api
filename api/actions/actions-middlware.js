// add middlewares here related to actions
const { get } = require("./actions-model");
const { getProjectActions } = require("../projects/projects-model");

function actionsById(req, res, next) {
  const { id } = req.params;

  get(id)
    .then((action) => {
      if (action) {
        req.body = action;
        next();
      } else {
        next({ status: 404, message: `Action ${id} not found` });
      }
    })
    .catch(next);
}

function checkActionsPayload(req, res, next) {
  if (!req.body.notes || !req.body.description || !req.body.project_id) {
    next({ status: 400, message: "missing required field" });
  } else {
    next();
  }
}

module.exports = { actionsById, checkActionsPayload };
