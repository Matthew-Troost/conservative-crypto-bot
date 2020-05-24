const { gql } = require('apollo-server-express');

// schema =  all the available data for reading and writing data via GraphQL.
const event = gql`
  extend type Query {
    events(minimumDate: String, limit: Int): [Event!]!
  }
  extend type Mutation {
    createEvent(type: String!, pricepointId: Int!): Event!
  }
  extend type Subscription {
    eventCreated: EventCreated
  }

  #----- FIELDS -----
  type Event {
    id: ID!
    createdAt: Date!
    pricePoint: PricePoint!
    type: String!
  }
  type EventCreated {
    event: Event!
  }
`;

module.exports = event;
