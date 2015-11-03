var fs = require('fs');
var path = require('path');

var config = require('config');
var Sequelize = require('sequelize');
var modelPath = path.join(__dirname, '../app/models');
var db = {};

var sequelize = new Sequelize(config.postgres.uri, {
  dialect: 'postgres',
  omitNull: true
});

// Import models
fs.readdirSync(modelPath)
  .forEach(function(file) {
    var model = sequelize.import(path.join(modelPath, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
