/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function(req, res) {
    User.create(req.body).fetch()
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(400).json(err);
      })
    ;
  },

};

