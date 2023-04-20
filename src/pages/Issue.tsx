import React, { useState } from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import IssueCertForm from '../components/IssueCertForm/IssueCertForm';
import FormHelpCard from '../components/FormHelpCard/FormHelpCard';
// import CertValid from '../components/CertificatesValidation/CertValid';

const Issue: React.FC = () => {
	const [name, setName] = useState('');
	return (
		<div className="container-fluid" id="issue">
			<PageTitle title="Issue certificate " />
			{/* <div className="col-xl-12 col-lg-12 pl-4 ml-2" id="issued-cert">
                <CertValid valid={true}>Certificate was issued successfully.</CertValid>
            </div> */}
			<div className="row pl-4 margin-bottom-lg">
				<div className="col-xl-8 col-lg-8 margin-bottom-lg">
					<IssueCertForm setName={setName}></IssueCertForm>
				</div>
				<div className="col-xl-4 col-lg-4">
					<FormHelpCard name={name}></FormHelpCard>
				</div>
			</div>
		</div>
	);
};

export default Issue;
