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

module.exports = { actionsById };
