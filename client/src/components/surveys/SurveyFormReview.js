import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

import _ from 'lodash';

const SurveyFormReview = ({ onReviewCancel, formValues, submitSurvey, history }) => {
	const reviewFields = _.map(formFields, ({ label, name }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button className="yellow darken-3 white-text btn-flat" onClick={onReviewCancel}>Back</button>
			<button className="green btn-flat white-text right" type="submit" onClick={() => submitSurvey(formValues, history)}>
				Send survey<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	formValues: state.form.surveyForm.values
});

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
