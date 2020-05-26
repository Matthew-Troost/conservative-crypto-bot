const { GraphQLDateTime } = require("graphql-iso-date");

const userResolvers = require("./user");
const pricePointResolvers = require("./pricepoint");
const eventResolvers = require("./event");
const stateResolvers = require("./state");
const profileResolvers = require("./profile");
const entryResolvers = require("./entry");
const exitResolvers = require("./exit");

const customScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [
  customScalarResolver,
  userResolvers,
  pricePointResolvers,
  eventResolvers,
  stateResolvers,
  profileResolvers,
  entryResolvers,
  exitResolvers
];
