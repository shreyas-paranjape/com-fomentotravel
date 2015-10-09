var _ = require('underscore');
exports.initLocals = function(req, res, next) {
	var locals = res.locals;
	locals.user = req.user;
	next();
};
exports.requireUser = function(req, res, next) {
	if (!req.user) {
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
