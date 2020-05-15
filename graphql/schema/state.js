const { gql } = require('apollo-server-express');

const state = gql`
  extend type Query {
    state: State!
  }
  extend type Mutation {
    updateState(
      status: String!,
      downwardCount: Int
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
  }
  type StateUpdated {
    state: State!
  }
`;

module.exports = state;
