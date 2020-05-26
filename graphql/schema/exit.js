const { gql } = require('apollo-server-express');

const exit = gql`
  extend type Query {
    exits(limit: Int): [Exit!]!
  }
  extend type Mutation {
    createExit(enterId: Int!, pricepointId: Int!): Exit!
  }
  extend type Subscription {
    exitCreated: ExitCreated
  }

  #----- FIELDS -----
  type Exit {
    id: ID!
    createdAt: Date!
    entry: Entry!
    pricePoint: PricePoint!
  }
  type ExitCreated {
    exit: Exit!
  }
`;

module.exports = exit;
