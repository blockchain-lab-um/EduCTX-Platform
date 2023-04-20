import React from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import Verification from '../components/CertificatesValidation/Verification';

class VerifyCertificates extends React.Component<any, any> {
	render() {
		return (
			<div className="container-fluid" id="verify">
				<PageTitle title="Verify Certificates" />
				<Verification></Verification>
			</div>
		);
	}
}

export default VerifyCertificates;
