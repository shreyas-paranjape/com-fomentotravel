var keystone = require('keystone');
var Types = keystone.Field.Types;
var App = new keystone.List('App', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});
App.add({
	name: {
		type: String,
		required: true
	},
	publishedDate: {
		type: Date,
		default: Date.now
	},
	image: {
		type: Types.CloudinaryImage
	},
});
App.register();
