/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { User } = sails.config.models;
const { sign } = sails.config.jsonwebtoken;

module.exports = {

  create: async (req, res) => {
    const { name, email, password } = req.body;

    if ([name, email, password].some(e => e === undefined)) {
      return res.badRequest();
    }

    try {
      const user = await User.create({
        name,
        email,
        password,
        isEmailVerified: false,
        username: email.split('@')[0],
        pic: sails.helpers.gravatar.getAvatarUrl(email)
      });

      const token = sign({
        id: user.id,
        username: user.username,
        name: user.name
      });

      res.set('Authorization', token);
      return res.json(token);
    } catch (e) {
      return res.forbidden(e);
    }

  },

  login: async (req, res) => {
    const { email, password } = req.body;
    let errors = {};

    if (email === '' || email === undefined) {
      errors = { ...errors, email: 'This field is required' };
    }
    if (password === '' || password === undefined) {
      errors = { ...errors, password: 'This field is required' };
    }

    if (Object.keys(errors).length > 0) {
      return res.json({ errors });
    }

    const user = await User.findOne({ where: {$or: [{email: {$eq: email}}, {username: {$eq: email}}] }});
    await sails.helpers.passwords.checkPassword(password, user.password).intercept('incorrect', 'badCombo');

    const token = sign({
      id: user.id,
      username: user.username,
      name: user.name
    });
    res.set('Authorization', token);
    res.json(token);
  },

};

