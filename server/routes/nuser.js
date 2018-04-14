import express from 'express';
const router = express.Router();
var passport = require('passport');
require('./../../config/passport')(passport);

router.post('/signup', function(req, res, next){
	passport.authenticate('signup', function(err, user,info){  
		if(err){
			console.log("ERR");
			return next(err);
		}
		if(!user){
			return res.status(400).json({ code: info });
		}
		return res.send({ success: true, message: user });
	})(req, res, next);
});

router.post('/signin', (req, res) => {
    /* to be implemented */
	console.log(req.session)
	passport.authenticate('signin', function(err, user,info){  
		if(err){
			console.log("ERR");
			return res.send(err);
		}
		if(!user){
			return res.send({ success : false, message: info , test: "Wordl"});
		}else{
			req.session.key = user.email;
			req.session.username = user.name
			console.log(req.session);
			return res.send({ success: true, message: user, test: "Hello"});
		}
	})(req, res);
});

router.get('/getinfo', (req, res) => {
    res.json({ info: req.passport_session });
});

router.get('/logout', (req, res) => {
	console.log(req.session)
	req.session.destroy()
	console.log(req.session)
	req.logout()

    return res.json({ success: true });
});

export default router;
