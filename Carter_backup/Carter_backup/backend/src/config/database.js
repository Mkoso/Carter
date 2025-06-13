const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.databaseUrl, {
  dialect: 'postgres',
  logging: config.nodeEnv === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL database connection has been established successfully.');
    
    // Sync all models
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Handle application termination
process.on('SIGINT', async () => {
  try {
    await sequelize.close();
    console.log('Database connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during database disconnection:', err);
    process.exit(1);
  }
});

module.exports = { sequelize, connectDB }; 