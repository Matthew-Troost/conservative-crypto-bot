const { GraphQLDateTime } = require('graphql-iso-date');

const userResolvers = require('./user');
const messageResolvers = require('./message');
const pricePointResolvers = require('./pricepoint');
const eventResolvers = require('./event');

const customScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [customScalarResolver, userResolvers, messageResolvers, pricePointResolvers, eventResolvers];
