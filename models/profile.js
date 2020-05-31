const profile = (sequelize, DataTypes) => {
  const Profile = sequelize.define("profile", {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "A profile needs to have a name.",
        },
      },
    },
    lunoAccountId: {
      type: DataTypes.STRING,
    },
    stopLimitPercentage: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: {
          args: true,
          msg: "The stop limit percentage must be of type float.",
        },
        max: {
          args: -0.1,
          msg: "The stop limit percentage must be less than -0.1.",
        },
      },
    },
    reservePercentage: {
        type: DataTypes.FLOAT,
        validate: {
          isFloat: {
            args: true,
            msg: "The reserve limit percentage must be of type float.",
          },
          min: {
            args: 0.1,
            msg: "The reserve limit percentage must be more than 0.1.",
          },
        },
      },
      maximumLossesPerDay: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: {
            args: true,
            msg: "The maximum losses per day must be of type integer.",
          },
          min: {
            args: 1,
            msg: "The maximum losses per day must be more than 1.",
          },
        },
      },
      tradeInput: {
        type: DataTypes.FLOAT,
        validate: {
          isFloat: {
            args: true,
            msg: "The trade input must be of type float.",
          },
          min: {
            args: 1,
            msg: "The trade input must be more than 1.",
          },
        },
      },
  });

  return Profile;
};
module.exports = profile;
