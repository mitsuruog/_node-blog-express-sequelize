'use strict';

module.exports = (sequelize, DataTypes) => {

  return sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      get() {
        return this.getDataValue('email');
      },

      set(val) {
        this.setDataValue('email', val.toLowerCase());
      },

      validate: {
        isEmail: {
          msg: 'Invalid email format.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    instanceMethods: {
      authenticate: function(password) {
        // TODO 本当はパスワードハッシュ化したほうがいいよ。。。
        return this.password === password;
      },
    },
    underscored: true,
    freezeTableName: true,
  });

};
