const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (recipientList) => {
	const invalidEmails = recipientList
		.replace(/,\s*$/, '')
		.split(',')
		.map(email => email.trim())
		.filter(email => !emailRegExp.test(email));

	if (invalidEmails.indexOf('') > -1) {
		return 'Please remove the comma at the beginning';
	}

	if (invalidEmails.length > 0) {
		return `These e-mails are invalid: ${invalidEmails}`;
	}

	return;
};
