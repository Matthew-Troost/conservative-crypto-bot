const { gql } = require('apollo-server-express');

// schema =  all the available data for reading and writing data via GraphQL.
const pricePoint = gql`
  extend type Query {
    pricePoints(cursor: String, limit: Int): [PricePoint!]!
  }
  extend type Mutation {
    createPricePoint(
      currency: String!,
      crypto: String!,
      value: Float!
    ): PricePoint!
    deleteOldPricePoints: Boolean!
  }
  extend type Subscription {
    pricePointCreated: PricePointCreated
  }

  #----- FIELDS -----
  type PricePoint {
    id: ID!
    createdAt: Date!
    currency: String!
    crypto: String!
    value: Float!
  }
  type PricePointCreated {
    pricePoint: PricePoint!
  }
`;

module.exports = pricePoint;
