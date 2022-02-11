// add middlewares here related to actions
const { get } = require("./actions-model");

const actionsById = (req, res, next) => {
  const { id } = req.params;

  get(id)
    .then((action) => {
      console.log(action);
      if (action) {
        console.log(action);
        req.body = action;
        next();
      } else {
        next({ status: 404, message: `Action ${id} not found` });
      }
    })
    .catch(next);
};

module.exports = { actionsById };
