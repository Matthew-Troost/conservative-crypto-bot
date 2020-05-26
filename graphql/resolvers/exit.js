const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./authorization");
const { pubsub, EVENTS } = require("../subscriptions");

const resolvers = {
  Query: {
    exits: async (parent, { limit = 5 }, { models }) => {
      return await models.Exit.findAll({
        order: [["createdAt", "DESC"]],
        limit,
      });
    },
  },
  Mutation: {
    createExit: combineResolvers(
      isAuthenticated,
      async (parent, { pricepointId, enterId }, { models }) => {
        const exit = await models.Exit.create({
          enterId,
          pricepointId,
        });

        pubsub.publish(EVENTS.EXIT.CREATED, {
          exitCreated: { exit },
        });

        return exit;
      }
    ),
  },
  Subscription: {
    exitCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.EXIT.CREATED),
    },
  },

  Exit: {
    pricePoint: async (exit, args, { loaders }) =>
      await loaders.pricePoint.load(exit.pricepointId),
    entry: async (exit, args, { loaders }) =>
      await loaders.entry.load(exit.enterId),
  },
};

module.exports = resolvers;
