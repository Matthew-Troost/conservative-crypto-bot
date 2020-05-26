const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./authorization");
const { pubsub, EVENTS } = require("../subscriptions");
const Sequelize = require("sequelize");

const resolvers = {
  Query: {
    entries: async (parent, { limit = 5 }, { models }) => {
      return await models.Entry.findAll({
        order: [["createdAt", "DESC"]],
        limit,
      });
    },
  },
  Mutation: {
    createEntry: combineResolvers(
      isAuthenticated,
      async (parent, { value, pricepointId, profileId }, { models }) => {
        const entry = await models.Entry.create({
          value,
          pricepointId,
          profileId,
        });

        pubsub.publish(EVENTS.ENTRY.CREATED, {
          entryCreated: { entry },
        });

        return entry;
      }
    ),
  },
  Subscription: {
    entryCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.ENTRY.CREATED),
    },
  },

  // field level resolvers
  Entry: {
    pricePoint: async (entry, args, { loaders }) =>
      await loaders.pricePoint.load(entry.pricepointId),
    profile: async (entry, args, { loaders }) =>
      await loaders.profile.load(entry.profileId),
  },
};

module.exports = resolvers;
