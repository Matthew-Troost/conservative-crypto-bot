const { PubSub } = require('apollo-server');
const PRICEPOINT_EVENTS = require('./pricepoint');
const EVENT_EVENTS = require('./event');

module.exports = {
    pubsub: new PubSub(), EVENTS: {
        PRICEPOINT: PRICEPOINT_EVENTS,
        EVENT: EVENT_EVENTS,
    }
};