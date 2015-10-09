require('dotenv').load();

var keystone = require('keystone');
var handlebars = require('express-handlebars');

keystone.Email.defaults.templateExt = 'hbs';
keystone.Email.defaults.templateEngine = require('handlebars');

keystone.init({

	'name': 'FomentoTravel',
	'brand': 'FomentoTravel',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',
	'emails': 'templates/emails',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs'
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'Admin'

});

keystone.import('models');

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	'enquiries': 'enquiries',
	'admins': 'admins',
	'sitedata': ['apps', 'modules', 'sections', 'categories', 'items']
});

keystone.start();
