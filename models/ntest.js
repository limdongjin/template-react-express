'use strict';
module.exports = (sequelize, DataTypes) => {
  var ntest = sequelize.define('ntest', 
		  { name: DataTypes.STRING
 }, {});
  ntest.associate = function(models) {
    // associations can be defined here
  };
  return ntest;
};
