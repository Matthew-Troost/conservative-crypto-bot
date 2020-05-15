const Sequelize = require('sequelize');

let sequelize;
if (process.env.DATABASE_URL) { //heroku environment variable (merged at deployment)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
  });
}
else{
   sequelize = new Sequelize(
    process.env.TEST_DATABASE || process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
    },
  );
}

const models = {
  User: sequelize.import('./user'),
  PricePoint: sequelize.import('./pricepoint'),
  Event: sequelize.import('./event'),
  State: sequelize.import('./state'),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { sequelize, models };
