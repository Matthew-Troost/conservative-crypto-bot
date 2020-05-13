const batchPricePoints = async (keys, models) => {
  const pricePoints = await models.PricePoint.findAll({
    where: {
      id: keys,
    },
  });
  return keys.map((key) => pricePoints.find((pricePoint) => pricePoint.id === key));
};

module.exports = batchPricePoints;
