import React from 'react';

const EduCTXIntro: React.FC = () => {
	return (
		<div className="small-screens">
			<div className="sidebar-brand-text heading-big text-center">
				EduCTX
			</div>
			<div className="sidebar-brand-text statement text-center">
				Efficient, simplified and safe
				<br />
				solution for student's certificate
				<br /> management and verification.
			</div>
			<a href="https://eductx.org/">
				<input
					type="button"
					className="btn btn-success pl-3 center"
					name="btn"
					defaultValue="FIND OUT MORE"
					id="find-out-more"
				/>
			</a>
		</div>
	);
};

export default EduCTXIntro;
