const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);
mongoose.connection.on('error', function(error) {
	console.error('Database connection error:', error);
});

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
	maxAge: 1 * 24 * 60 * 60 * 1000,		// cookie expires in 1 day
	keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// serve up production assets like main.js, main.css. In built index.html are
	// <link src='/static/css/main.css... ></link> and <script src='/static/js/main.js'></script>
	app.use(express.static('client/build'));

	// for all routes not on authRoutes, billingRoutes, client/build/static/js/main.js,  client/build/static/css/main.css
	// serve up client/build/index.html
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
