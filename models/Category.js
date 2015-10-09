var keystone = require('keystone');
var Types = keystone.Field.Types;
var Category = new keystone.List('Category', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});
Category.add({
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
	section: {
		type: Types.Relationship,
		ref: 'Section'
	}
});
Category.schema.methods.items = function(done) {
	return keystone.list('Item').model.find()
		.where('category', this._id)
		.exec(done);
};
Category.register();
