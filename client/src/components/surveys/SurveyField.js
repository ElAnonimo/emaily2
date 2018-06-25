import React from 'react';

export default (props) => {
	console.log("custom field's props:", props);

	return (
		<div>
			<label>{props.label}</label>
			<input {...props.input} style={{ marginBottom: '0' }} />
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{props.meta.touched && props.meta.error}
			</div>
		</div>
	);
}
