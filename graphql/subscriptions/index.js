const { PubSub } = require("apollo-server");
const PRICEPOINT_EVENTS = require("./pricepoint");
const EVENT_EVENTS = require("./event");
const STATE_EVENTS = require("./state");
const ENTRY_EVENTS = require("./entry");
const EXIT_EVENTS = require("./exit");

module.exports = {
  pubsub: new PubSub(),
  EVENTS: {
    PRICEPOINT: PRICEPOINT_EVENTS,
    EVENT: EVENT_EVENTS,
    STATE: STATE_EVENTS,
    ENTRY: ENTRY_EVENTS,
    EXIT: EXIT_EVENTS
  },
};
