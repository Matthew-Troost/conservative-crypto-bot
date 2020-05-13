const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./authorization");
const { pubsub, EVENTS } = require("../subscriptions");

//resolver map
//each resolver has 4 arguments (parent, args, context, info).
//Can inject dependencies for the resolver via context
const resolvers = {
  Query: {
    events: async (parent, args, { models }) => {
      return await models.Event.findAll();
    },
  },
  Mutation: {
    createEvent: combineResolvers(
      isAuthenticated,
      async (parent, { type, pricePointId }, { models }) => {
        const event = await models.Event.create({
          type,
          pricePointId,
        });

        pubsub.publish(EVENTS.EVENT.CREATED, {
          eventCreated: { event },
        });
        
        return event;
      }
    ),
  },
  Subscription: {
    eventCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.EVENT.CREATED),
    },
  },

  //field level resolvers
  Event: {
    pricePoint: async (event, args, { loaders }) => {
      return await loaders.pricePoint.load(event.pricePointId);
    },
  },
};

module.exports = resolvers;
