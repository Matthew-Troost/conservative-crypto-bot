const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./authorization");
const { pubsub, EVENTS } = require("../subscriptions");
const Sequelize = require('sequelize');

// resolver map
// each resolver has 4 arguments (parent, args, context, info).
// Can inject dependencies for the resolver via context
const resolvers = {
  Query: {
    pricePoints: async (parent, { cursor, limit = 5 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: cursor,
              },
            },
          }
        : {};

      return await models.PricePoint.findAll({
        order: [["createdAt", "DESC"]],
        limit,
        cursorOptions,
      });
    },
  },
  Mutation: {
    createPricePoint: combineResolvers(
      isAuthenticated,
      async (parent, { currency, crypto, value }, { models }) => {
        const pricePoint = await models.PricePoint.create({
          currency,
          crypto,
          value,
        });
        pubsub.publish(EVENTS.PRICEPOINT.CREATED, {
          pricePointCreated: { pricePoint },
        });
        return pricePoint;
      }
    ),
  },
  Subscription: {
    pricePointCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.PRICEPOINT.CREATED),
    },
  },
};

module.exports = resolvers;
