const passport = require('passport');

module.exports = (app) => {
	app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout', (req, res) => {
		req.logout();		// passport method. Empties user id on cookie
		res.redirect('/');
		// res.send(req.user);
		// res.send(req.session);
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
		// res.send(req.session);
	});
};
