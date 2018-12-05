const mongoose = require('mongoose');

module.exports = () => {
  // Connect to the database before starting the application server.
  return new Promise((resolve) => {
    const { MONGODB_USER, MONGODB_PASS } = process.env;
    console.log('MongoDB URL', `mongodb://${MONGODB_USER}:${MONGODB_PASS}@ds125684.mlab.com:25684/chatapp`);
    mongoose.connect(`mongodb://${MONGODB_USER}:${MONGODB_PASS}@ds125684.mlab.com:25684/chatapp`, (err, database) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      // Save database object from the callback for reuse.
      resolve(database);
    });
  });
};
