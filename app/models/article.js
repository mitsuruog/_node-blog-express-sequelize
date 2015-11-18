'use strict';

module.exports = (sequelize, DataTypes) => {

  return sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      validate: {
        max: {
          args: [120],
          msg: 'Title is too long(120 max)',
        },
      },
    },
    text: {
      type: DataTypes.STRING(1024),
    },
    slug: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('slug', val.toLowerCase().replace(' ', '-'));
      },
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    underscored: true,
    freezeTableName: true,
  });

};
