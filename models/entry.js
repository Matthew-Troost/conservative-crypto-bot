const entry = (sequelize, DataTypes) => {
  const Entry = sequelize.define("enter", {
    value: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: {
            args: true,
            msg: "Value must be of type float.",
          },
          min: {
            args: 1,
            msg: "Value must be more than 1.",
          },
      },
    },
  });

  Entry.associate = (models) => {
    Entry.belongsTo(models.Profile);
    Entry.belongsTo(models.PricePoint);
  };

  return Entry;
};
module.exports = entry;
