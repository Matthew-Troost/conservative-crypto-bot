const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./authorization");
const { pubsub, EVENTS } = require("../subscriptions");

const resolvers = {
  Query: {
    state: async (parent, args, { models }) => await models.State.findOne(),
  },
  Mutation: {
    updateState: combineResolvers(
      isAuthenticated,
      async (parent, args, { models }) => {
        const result = await models.State.update(args, {
          where: {
            id: 1,
          },
          returning: true,
          plain: true,
        });
        pubsub.publish(EVENTS.STATE.UPDATED, {
          stateUpdated: { state: result[1].dataValues },
        });
        return true;
      }
    ),
  },
  Subscription: {
    stateUpdated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.STATE.UPDATED),
    },
  },
  // field level resolvers
  State: {
    entryPricePoint: async (state, args, { loaders }) =>
      state.entryPricePointId
        ? await loaders.pricePoint.load(state.entryPricePointId)
        : null,
    reservePricePoint: async (state, args, { loaders }) =>
      state.reservePricePointId
        ? await loaders.pricePoint.load(state.reservePricePointId)
        : null,
    lastDownwardPricePoint: async (state, args, { loaders }) =>
      state.lastDownwardPricePointId
        ? await loaders.pricePoint.load(state.lastDownwardPricePointId)
        : null,
  },
};

module.exports = resolvers;
