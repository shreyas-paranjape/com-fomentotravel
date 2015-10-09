var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var catQuery = keystone.list('Category').model.findOne({
		key: req.params.id
	});
	view.query("category", catQuery);
	view.on('init', function(next) {
		catQuery.exec(function(err, cat) {
			if (cat !== null) {
				cat.items(function(err, res) {
					locals.items = res;
					next(err);
				});
			}
		});
	});
	view.render('category');
};
