var moment = require('moment');
var _ = require('underscore');
var hbs = require('handlebars');
var keystone = require('keystone');
var cloudinary = require('cloudinary');
var CLOUDINARY_HOST = 'http://res.cloudinary.com';
var linkTemplate = _.template('<a href="<%= url %>"><%= text %></a>');
var scriptTemplate = _.template('<script src="<%= src %>"></script>');
var cssLinkTemplate = _.template('<link href="<%= href %>" rel="stylesheet">');
var cloudinaryUrlLimit = _.template(CLOUDINARY_HOST + '/<%= cloudinaryUser %>/image/upload/c_limit,f_auto,h_<%= height %>,w_<%= width %>/<%= publicId %>.jpg');
module.exports = function() {
	var _helpers = {};
	/**
	 * Generic HBS Helpers
	 * ===================
	 */
	// standard hbs equality check, pass in two values from template
	// {{#ifeq keyToCheck data.myKey}} [requires an else blockin template regardless]
	_helpers.ifeq = function(a, b, options) {
		if (a == b) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};
	/**
	 * Port of Ghost helpers to support cross-theming
	 * ==============================================
	 *
	 * Also used in the default keystonejs-hbs theme
	 */
	// ### Date Helper
	// A port of the Ghost Date formatter similar to the keystonejs - jade interface
	//
	//
	// *Usage example:*
	// `{{date format='MM YYYY}}`
	// `{{date publishedDate format='MM YYYY'`
	//
	// Returns a string formatted date
	// By default if no date passed into helper than then a current-timestamp is used
	//
	// Options is the formatting and context check this.publishedDate
	// If it exists then it is formated, otherwise current timestamp returned
	_helpers.date = function(context, options) {
		if (!options && context.hasOwnProperty('hash')) {
			options = context;
			context = undefined;

			if (this.publishedDate) {
				context = this.publishedDate;
			}
		}
		// ensure that context is undefined, not null, as that can cause errors
		context = context === null ? undefined : context;
		var f = options.hash.format || 'MMM Do, YYYY',
			timeago = options.hash.timeago,
			date;
		// if context is undefined and given to moment then current timestamp is given
		// nice if you just want the current year to define in a tmpl
		if (timeago) {
			date = moment(context).fromNow();
		} else {
			date = moment(context).format(f);
		}
		return date;
	};
	/**
	 * KeystoneJS specific helpers
	 * ===========================
	 */
	// block rendering for keystone admin css
	_helpers.isAdminEditorCSS = function(user, options) {
		var output = '';
		if (typeof(user) !== 'undefined' && user.isAdmin) {
			output = cssLinkTemplate({
				href: "/keystone/styles/content/editor.min.css"
			});
		}
		return new hbs.SafeString(output);
	};
	// block rendering for keystone admin js
	_helpers.isAdminEditorJS = function(user, options) {
		var output = '';
		if (typeof(user) !== 'undefined' && user.isAdmin) {
			output = scriptTemplate({
				src: '/keystone/js/content/editor.js'
			});
		}
		return new hbs.SafeString(output);
	};
	// Used to generate the link for the admin edit post button
	_helpers.adminEditableUrl = function(user, options) {
		var rtn = keystone.app.locals.editable(user, {
			'list': 'Post',
			'id': options
		});
		return rtn;
	};
	// ### CloudinaryUrl Helper
	// Direct support of the cloudinary.url method from Handlebars (see
	// cloudinary package documentation for more details).
	//
	// *Usage examples:*
	// `{{{cloudinaryUrl image width=640 height=480 crop='fill' gravity='north'}}}`
	// `{{#each images}} {{cloudinaryUrl width=640 height=480}} {{/each}}`
	//
	// Returns an src-string for a cloudinary image
	_helpers.cloudinaryUrl = function(context, options) {
		// if we dont pass in a context and just kwargs
		// then `this` refers to our default scope block and kwargs
		// are stored in context.hash
		if (!options && context.hasOwnProperty('hash')) {
			// strategy is to place context kwargs into options
			options = context;
			// bind our default inherited scope into context
			context = this;
		}
		// safe guard to ensure context is never null
		context = context === null ? undefined : context;
		if ((context) && (context.public_id)) {
			var imageName = context.public_id.concat('.', context.format);
			return cloudinary.url(imageName, options.hash);
		} else {
			return null;
		}
	};
	//  ### underscoreMethod call + format helper
	//	Calls to the passed in underscore method of the object (Keystone Model)
	//	and returns the result of format()
	//
	//  @obj: The Keystone Model on which to call the underscore method
	//	@undescoremethod: string - name of underscore method to call
	//
	//  *Usage example:*
	//  `{{underscoreFormat enquiry 'enquiryType'}}
	_helpers.underscoreFormat = function(obj, underscoreMethod) {
		return obj._[underscoreMethod].format();
	}
	return _helpers;
};
