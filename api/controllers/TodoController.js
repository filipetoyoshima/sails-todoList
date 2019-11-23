/**
 * TodoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function (req, res) {
    req.body.owner = req.user.id;
    Todo.create(req.body).fetch()
      .then(todo => {
        res.status(200).json(todo);
      })
      .catch(err => {
        res.status(400).json(err);
      })
    ;
  },

  list: function (req, res) {
    Todo.find({ owner: req.user.id })
      .then(todos => {
        res.status(200).json(todos);
      })
      .catch(err => {
        res.status(400).json(err);
      })
    ;
  }

};

