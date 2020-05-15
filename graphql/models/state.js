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
  });

  return State;
};
module.exports = state;
