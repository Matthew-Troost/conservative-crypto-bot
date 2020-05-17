const { gql } = require("apollo-server-express");

const state = gql`
  extend type Query {
    state: State!
  }
  extend type Mutation {
    updateState(
      status: String
      downwardCount: Int
      entryPricePointId: Int
      reservePricePointId: Int
      lastDownwardPricePointId: Int
    ): Boolean!
  }
  extend type Subscription {
    stateUpdated: StateUpdated!
  }

  #----- FIELDS -----
  type State {
    id: ID!
    status: String!
    downwardCount: Int
    entryPricePoint: PricePoint
    reservePricePoint: PricePoint
    lastDownwardPricePoint: PricePoint
  }
  type StateUpdated {
    state: State!
  }
`;

module.exports = state;
