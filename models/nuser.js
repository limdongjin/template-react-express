'use strict';
module.exports = (sequelize, DataTypes) => {
  var Nuser = sequelize.define('Nuser', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
	name: DataTypes.STRING,
	password: DataTypes.STRING,
	addr: DataTypes.STRING
  }, {
	  charset: 'utf8',
	  instanceMethods: {
            generateHash(password){
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
	  }
  });
  Nuser.associate = function(models) {
    // associations can be defined here
  };
  return Nuser;
};
