var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
keystone.pre('routes', middleware.initLocals);
var routes = {
	views: importRoutes('./views')
};
exports = module.exports = function(app) {
	app.get('/', routes.views.index);
	app.get('/module/:id', routes.views.module);
	app.get('/section/:id', routes.views.section);
	app.get('/category/:id', routes.views.category);
	app.get('/policy', routes.views.policy);
	app.get('/terms', routes.views.terms);
	app.get('/legacy', routes.views.legacy);
	app.all('/contact', routes.views.contact);
};
