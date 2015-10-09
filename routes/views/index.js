var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	view.query('modules',keystone.list('Module').model.find());
	view.query('app',keystone.list('App').model.findOne());
	view.render('index');
};
