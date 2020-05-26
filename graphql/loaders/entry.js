const batchEntries = async (keys, models) => {
    const entries = await models.Entry.findAll({
      where: {
        id: keys,
      },
    });
    return keys.map((key) => entries.find((entry) => entry.id === key));
  };
  
  module.exports = batchEntries;
  