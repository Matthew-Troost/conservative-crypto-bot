const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./authorization");
const lodash = require('lodash')

const resolvers = {
  Query: {
    profiles: async (parent, args, { models }) => {
      return await models.Profile.findAll();
    },
  },
  Mutation: {
    createProfile: combineResolvers(
      isAuthenticated,
      async (
        parent,
        args,
        { models }
      ) => {
        const profile = await models.Profile.create(args);
        return profile;
      }
    ),
    updateProfile: combineResolvers(
      isAuthenticated,
      async (parent, args, { models }) => {
        await models.Profile.update(lodash.omit(args, 'id'), {
          where: {
            id: args.id,
          },
        });
        return true;
      }
    ),
  },
};

module.exports = resolvers;
