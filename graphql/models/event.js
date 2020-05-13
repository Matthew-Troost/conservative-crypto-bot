const event = (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'An event needs to have a type/explanation.',
        },
      },
    },
  });

  Event.associate = (models) => {
    Event.belongsTo(models.PricePoint);
  };

  return Event;
};
module.exports = event;
