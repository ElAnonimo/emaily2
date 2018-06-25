const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');			// comes with Node

const Survey = mongoose.model('surveys');

module.exports = (app) => {
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey
			.find({ _user: req.user.id })
			.select({ recipients: false });			// exclude recipients field

		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => res.send('Thank you for voting.'));

	app.post('/api/surveys/webhooks', (req, res) => {
		console.log('webhook req.body:', req.body);
		res.send({});			// to let Sendgrid know we received its post request by this route

		const p = new Path('/api/surveys/:surveyId/:choice');		// p is null when no surveyId or choice
		const events = _.chain(req.body)
			.map(({ url, email }) => {
				if (url) {
					const match = p.test(new URL(url).pathname);
					if (match) {
						return { email, surveyId: match.surveyId, choice: match.choice };
					}
				}
			})
			.compact()											// removes all undefined
			.uniqBy('email', 'surveyId')		// both args unique at the same time
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne({
					_id: surveyId,
					recipients: {
						$elemMatch: { email: email, responded: false }
					}
				}, {
					$inc: { [choice]: 1 },
					$set: { 'recipients.$.responded': true },
					lastResponded: new Date()
				}).exec();
			})
			.value();

		console.log('webhook events:', events);
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, "recipient list": recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			"recipient list": recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,		// id for Mongo user id
			dateSent: Date.now()
		});
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			await mailer.send();

			await survey.save();

			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		} catch(err) {
			res.status(422).send(err);			// 422 for unprocessable data sent (user sent it poorly formatted)
		}
	});
};
