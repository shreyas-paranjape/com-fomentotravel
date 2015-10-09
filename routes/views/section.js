var keystone = require('keystone');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.rows = [];
	var sectionQuery = keystone.list('Section').model.findOne({
		key: req.params.id
	});
	view.query("section", sectionQuery);
	view.on('init', function(next) {
		sectionQuery.exec(function(err, sec) {
			if (sec !== null) {
				sec.categories(function(err, res) {
					while (res.length > 0) {
						locals.rows.push({
							"categories": res.splice(0, 2)
						});
					}
					next(err);
				});
			}
		});
	});
	view.render('section');
};
