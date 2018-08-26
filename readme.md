# Emaily

This is a full stack M.E.R.N application that allows users to create and send email surveys. It features various React.js lifecycle methods as well as use of Redux.js. An application survey email contains a link to a SendGrid webhook to track the serveyees' responses. SendGrid polls its webhook data every 15 minutes so it'll take a little while before the response stats show up in the application. A user can log in with their Google account and add funds with a sandbox Stripe account credit card in order to be able to send emails. Please note the credit card number is 4242 4242 4242 4242.

Before launch the application please install the dependencies. Please note the required Node version is 8.4.0. To run the application please execute `npm run dev`. The apllication runs on http://localhost:3000

Heroku: https://mikki-emaily-2.herokuapp.com/