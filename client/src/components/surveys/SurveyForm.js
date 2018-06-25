import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';			// reduxForm is like connect() but for redux-form
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

import _ from 'lodash';

class SurveyForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return <Field key={name} type="text" component={SurveyField} label={label} name={name} />
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link className="red btn-flat white-text" to="/surveys">Cancel</Link>
					<button className="teal btn-flat right white-text" type="submit">
						Next<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {			// values for surveyForm values
	const errors = {};

	errors['recipient list'] = validateEmails(values['recipient list'] || '');

	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'Please provide a ' + name;
		}
	});

	return errors;
}

export default reduxForm({
	form: 'surveyForm',
	validate,
	destroyOnUnmount: false
})(SurveyForm);
