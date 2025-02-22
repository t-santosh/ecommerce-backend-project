const db = require('./config/db');

// Sync the models with the database
db.sync({ force: false }) // `force: false` will not drop the tables, set to `true` to forcefully drop and re-create
  .then(() => {
    console.log('Database synced!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
