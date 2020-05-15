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
      async (parent, { status, downwardCount }, { models }) => {
        const result = await models.State.update(
          {
            status,
            downwardCount,
          },
          {
            where: {
              id: 1,
            },
            returning: true,
            plain: true
          }
        );
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
};

module.exports = resolvers;
