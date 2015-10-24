var path = require('path');
// ES6 Object.assign() ponyfill
var objectAssign = require('object-assign');

// All configurations will extend these options
// ============================================
var all = {

  // Root path of server
  root: path.normalize(__dirname + '/../..'),

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SESSION_SECRET || 'session-secret',
    cookie: process.env.COOKIE_SECRET || 'cookie-secret'
  },

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGOLAB_URI,
    options: {
      db: {
        safe: true
      }
    }
  },

  redis: {
    uri: process.env.REDIS_URL
  }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = (env) => {
  return objectAssign({}, all, require('./' + env + '.js'));
};
