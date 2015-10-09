var keystone = require('keystone');
var Types = keystone.Field.Types;
var Section = new keystone.List('Section', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});
Section.add({
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
	imageOuter: {
		type: Types.CloudinaryImage
	},
	imageInner: {
		type: Types.CloudinaryImage
	},
	module: {
		type: Types.Relationship,
		ref: 'Module'
	}
});
Section.schema.methods.categories = function(done) {
	return keystone.list('Category').model.find()
		.where('section', this._id)
		.exec(done);
};
Section.register();
