const exit = (sequelize, DataTypes) => {
  const Exit = sequelize.define("exit");

  Exit.associate = (models) => {
    Exit.belongsTo(models.Entry);
    Exit.belongsTo(models.PricePoint);
  };

  return Exit;
};
module.exports = exit;
