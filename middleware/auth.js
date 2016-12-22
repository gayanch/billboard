var auth = function(req, res, next) {
	if(req.session.login) {
		next();
	} else {
		res.render('login');
	}
	//next();
}

module.exports = {
	auth: auth,
};
