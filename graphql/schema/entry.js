const { gql } = require('apollo-server-express');

const enter = gql`
  extend type Query {
    entries(limit: Int): [Entry!]!
  }
  extend type Mutation {
    createEntry(value: Float!, pricepointId: Int!, profileId: Int!): Entry!
  }
  extend type Subscription {
    entryCreated: EntryCreated
  }

  #----- FIELDS -----
  type Entry {
    id: ID!
    createdAt: Date!
    profile: Profile!
    pricePoint: PricePoint!
    value: Float!
  }
  type EntryCreated {
    entry: Entry!
  }
`;

module.exports = enter;
