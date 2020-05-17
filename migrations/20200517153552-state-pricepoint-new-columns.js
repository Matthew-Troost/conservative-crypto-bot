const Sequelize = require("sequelize");
("use strict");

module.exports = {
  up: (queryInterface) => {
    return Promise.all([
      queryInterface.addColumn(
        "states",
        "entryPricePointId",
        Sequelize.INTEGER
      ),
      queryInterface.addColumn(
        "states",
        "reservePricePointId",
        Sequelize.INTEGER
      ),
      queryInterface.addColumn(
        "states",
        "lastDownwardPricePointId",
        Sequelize.INTEGER
      ),
    ]);
  },

  down: (queryInterface) => {},
};
