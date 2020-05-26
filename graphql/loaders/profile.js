const batchProfiles = async (keys, models) => {
    const profiles = await models.Profile.findAll({
      where: {
        id: keys,
      },
    });
    return keys.map((key) => profiles.find((profile) => profile.id === key));
  };
  
  module.exports = batchProfiles;