var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	view.query("categories", keystone.list('Category').model.find());
	var locals = res.locals;
	locals.rows = [];
	view.on('init', function(next) {
		keystone.list('Module').model.findOne({
			key: req.params.id
		}).exec(function(err, mod) {
			if (mod !== null) {
				mod.sections(function(err, res) {
					while (res.length > 0) {
						locals.rows.push({
							"sections": res.splice(0, 2)
						});
					}
					next(err);
				});
			}
		});
	});
	view.render('module');
};
