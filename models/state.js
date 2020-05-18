const state = (sequelize, DataTypes) => {
  const State = sequelize.define("state", {
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status must have a value.",
        },
      },
    },
    downwardCount: {
      type: DataTypes.INTEGER,
    },
    entryPricePointId: {
      type: DataTypes.INTEGER,
    },
    reservePricePointId: {
      type: DataTypes.INTEGER,
    },
    lastDownwardPricePointId: {
      type: DataTypes.INTEGER,
    },
    lastCashOut: {
      type: DataTypes.DATE,
    },
  });

  return State;
};
module.exports = state;
