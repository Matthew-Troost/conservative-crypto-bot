const Sequelize = require("sequelize");
'use strict';

module.exports = {
  up: (queryInterface) => {
    return Promise.all([
      queryInterface.addColumn(
        "states",
        "lastCashOut",
        Sequelize.DATE
      ),
    ]);
  },
  down: (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
