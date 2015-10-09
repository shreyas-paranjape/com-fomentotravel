var keystone = require('keystone');
var Types = keystone.Field.Types;

var Module = new keystone.List('Module', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Module.add({
	name: { type: String, required: true },
  description: { type: Types.Html, wysiwyg: true, height: 400 },
	publishedDate: { type: Date, default: Date.now },
});

Module.schema.methods.sections = function(done){
  return keystone.list('Section').model.find()
    .where('module', this._id )
    .exec(done);
};

Module.register();
