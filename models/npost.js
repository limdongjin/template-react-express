'use strict';
module.exports = (sequelize, DataTypes) => {
  var Npost = sequelize.define('Npost', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Npost.associate = function(models) {
    // associations can be defined here
  };
  return Npost;
};
