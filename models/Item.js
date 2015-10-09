var keystone = require('keystone');
var Types = keystone.Field.Types;
var Item = new keystone.List('Item', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});
Item.add({
	name: {
		type: String,
		required: true
	},
	description: {
		type: Types.Html,
		wysiwyg: true,
		height: 400
	},
	publishedDate: {
		type: Date,
		default: Date.now
	},
	image: {
		type: Types.CloudinaryImage
	},
	category: {
		type: Types.Relationship,
		ref: 'Category'
	}
});
Item.register();
