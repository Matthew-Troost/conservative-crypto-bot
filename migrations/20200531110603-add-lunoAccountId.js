const Sequelize = require("sequelize");
'use strict';

module.exports = {
  up: (queryInterface) => {
    return Promise.all([
      queryInterface.addColumn(
        "profiles",
        "lunoAccountId",
        Sequelize.STRING
      ),
    ]);
  },

  down: (queryInterface) => {

  }
};
