// const { combineResolvers } = require('graphql-resolvers');
// const { AuthenticationError, UserInputError } = require('apollo-server');
// const { isAdmin, isAuthenticated } = require('./authorization');

module.exports = {
  Query: {
    profiles: async (parent, args, { models }) => {
      return models.User.findAll({
        include: {
          model: models.Address,
          as: 'addresses'
        },
      });
    },
    profile: async (parent, { id }, { models }) => {
      return models.User.findOne({
        where: {
          id: id,
          include: {
            model: models.Address,
            as: 'addresses'
          }
        }
      });
    },
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }

      return models.User.findOne({
        where: {
          id: me.id,
          include: {
            model: models.Address,
            as: 'addresses'
          }
        }
      });
    },
  },
  Profile: {
    business: (parent, args, { models }) => (parent.type === 'Business' ?
      models.Business.findOne({ where: { owner: parent.id } }) : null),
  }
};
