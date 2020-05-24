const { gql } = require("apollo-server-express");

const profile = gql`
  extend type Query {
    profiles: [Profile!]!
  }
  extend type Mutation {
    createProfile(
      name: String!
      stopLimitPercentage: Float!
      reservePercentage: Float!
      maximumLossesPerDay: Int!
      tradeInput: Float!
    ): Profile!
    updateProfile(
      id: ID!
      name: String
      stopLimitPercentage: Float
      reservePercentage: Float
      maximumLossesPerDay: Int
      tradeInput: Float
    ): Boolean!
  }

  #----- FIELDS -----
  type Profile {
    id: ID!
    createdAt: Date!
    name: String!
    stopLimitPercentage: Float!
    reservePercentage: Float!
    maximumLossesPerDay: Int!
    tradeInput: Float!
  }
`;

module.exports = profile;
