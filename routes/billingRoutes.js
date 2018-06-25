const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		/* if (!req.user) {
			return res.status(401).send({ error: 'Please log in to add credits' });		// 401 for unauthorized
		} */

		console.log('backend billing API req.body:', req.body);

		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 e-mail credits',
			source: req.body.id
		});

		console.log('Stripe charge:', charge);

		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user);
	});
};
