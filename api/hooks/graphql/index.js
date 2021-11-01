/**
 * graphql hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineGraphqlHook(sails) {
  const { ApolloServer } = require('apollo-server-express');
  const schema = require('./schema');
  const resolvers = require('./resolvers');
  const loaders = require('./loaders');
  const models = sails.config.models;

  const server = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs: schema,
    resolvers,
    context: async ({ req }) => {
      const me = null;
      if (req && req.headers && req.headers.Authorization) {
        me = sails.config.jsonwebtoken.verify(req.headers.Authorization);
      }
      return {
        models,
        me,
        loaders: {
          user: loaders.user
        }
      };
    }
  });

  return {

    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function () {

      sails.log.info('Initializing custom hook GraphQL');
      const app = sails.hooks.http.app;
      await server.start();
      server.applyMiddleware({ app, path: '/graphql' });

    }

  };

};
