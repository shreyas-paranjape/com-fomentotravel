var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'contact';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	view.on('post', {
		action: 'contact'
	}, function(next) {
		var newEnquiry = new Enquiry.model(),
			updater = newEnquiry.getUpdateHandler(req);
		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, message',
			errorMessage: 'There was a problem submitting your enquiry:'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				new keystone.Email('enquiry').send({
					subject: 'New Inquiry at fomento travel',
					to: 'ameyparsekar@gmail.com',
					fromName: 'Fomento travel',
					fromEmail: 'contact@fomentotravel.com',
					enquiry: req.body
				}, function(err, info) {
					if (err) {
						console.log('error : ' + err);
					}
				});
				locals.enquirySubmitted = true;
			}
			next();
		});
	});
	view.render('contact');
};
