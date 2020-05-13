const { PubSub } = require('apollo-server');
const MESSAGE_EVENTS = require('./message');
const PRICEPOINT_EVENTS = require('./message');
const EVENT_EVENTS = require('./message');

module.exports = {
    pubsub: new PubSub(), EVENTS: {
        MESSAGE: MESSAGE_EVENTS,
        PRICEPOINT: PRICEPOINT_EVENTS,
        EVENT: EVENT_EVENTS,
    }
};