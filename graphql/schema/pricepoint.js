const { gql } = require("apollo-server-express");

//schema =  all the available data for reading and writing data via GraphQL.
const pricePoint = gql`
  extend type Query {
    pricePoints: [Message!]!
  }
  extend type Mutation {
    createPricePoint(
      currency: String!
      crypto: String1
      value: Int!
    ): PricePoint!
  }
  extend type Subscription {
    pricePointCreated: PricePointCreated!
  }

  #----- FIELDS -----
  type PricePoint {
    id: ID!
    createdAt: Date!
    currency: String!
    crypto: String!
    value: Int!
  }
  type PricePointCreated {
    pricePoint: PricePoint!
  }
`;

module.exports = pricePoint;
