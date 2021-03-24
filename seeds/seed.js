const sequelize = require('../config/connection');
const { User,Article } = require('../models');

const userData = require('./userData.json');
const articleData = require('./articleData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Article.bulkCreate(articleData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
