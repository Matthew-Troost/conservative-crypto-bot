const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('./authorization');
const { pubsub, EVENTS } = require('../subscriptions');

const resolvers = {
  Query: {
    state: async (parent, args, { models }) => await models.State.findOne(),
  },
  Mutation: {
    updateState: combineResolvers(
      isAuthenticated,
      async (parent, { status, downwardCount }, { models }) => {
        const state = await models.State.update({
            status,
            downwardCount,
        });
        pubsub.publish(EVENTS.STATE.UPDATED, {
          stateUpdated: { state },
        });
        return state;
      },
    ),
  },
  Subscription: {
    stateUpdated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.STATE.UPDATED),
    },
  },
};

module.exports = resolvers;
