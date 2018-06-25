import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
	constructor() {
		super();
		this.state = { showFormReview: false };
	}

	renderContent() {
		if (this.state.showFormReview) {
			return <SurveyFormReview onReviewCancel={() => this.setState({ showFormReview: false })} />;
		}

		return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
	}

	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

export default reduxForm({ form: 'surveyForm' })(SurveyNew);
