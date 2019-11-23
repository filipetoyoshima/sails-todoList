/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var jwt = require('jsonwebtoken');

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

  login: function(req, res) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user.password == req.body.password) {
          return res.status(200).json({
            token: jwt.sign(user.toJSON(), 'secret')
          });
        }
        return res.status(400).json({
          err: 'senha inválida'
        });
      })
      .catch(err => {
        return res.status(401).json({
          err: 'usuário não encontrado'
        });
      })
    ;
  },

  protectedRoute: function(req, res) {
    return res.status(200).json({msg: "tá safe!"});
  },

};
