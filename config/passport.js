const db = require('./../models');
var LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs'); 
// middle ware

var generateHash = function(password) {	 
	    return bcrypt.hashSync(password, 8);
};
function validateemail(email) {   
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-za-z\-0-9]+\.)+[a-za-z]{2,}))$/;   
	return re.test(email); 
}

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
		db.Nuser.findOne({ 
			where: {id: id} 	
		}).then(function(result){
			done(err, user);
		});
    });

	passport.use('signin', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, email, password, done) { 
            db.Nuser.findOne({ where: {'email' : email} })
				.then(function(user) {
                	if (!user){
                    	return done(null, false, { message: "Not Registered Email" });
					}else{
						bcrypt.compare(password, user.password, function(err, res){
							if(res){
								return done(null, user);
							} else{
								return done(null, false, {  message: "Not Match" });
							}
						});
							
					}
            });
    }));	

	passport.use('signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
		db.Nuser.findOne({ 
			where: {email: email} 
		})
		.then(function(user){
			if(user){
				// Exist User
				return done(null, false, { error: 1 });
			}else{
				// check email format
				if(!validateemail(email)){
					// Unvalid Email Format
					return done(null, false, { error: 2 });
				}
		
				// check name format 
    			const nameregex = /^[ㄱ-ㅎ|가-힣|a-z|a-z|0-9|\*]+$/;
				if(!nameregex.test(req.body.username)){
					// Unvalid Name Format
					return done(null, false, { error: 3 });
				}
								// check password length
				if(password.length < 4 || typeof password !== "string"){
				    // Password is short
					return done(null, false, { error: 4 });
				}

				const account = db.Nuser.build({
					email: email,
					password: password,
					name: req.body.username
				});

		    	account.password = generateHash(account.password);
				account.save()
					.then( (acc) => {
						return done(null, acc);
					})
					.catch( () => {
		    			return done(null, false, { error: 5 });
					});
			}	
		});
	}));
		
};



