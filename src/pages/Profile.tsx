import React, { useState } from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import InstitutionProfile from '../components/InstitutionProfile/InstitutionProfile';
import FormHelpCard from '../components/FormHelpCard/FormHelpCard';
import AuthorizedPerson from '../components/AuthorizedPerson/AuthorizedPerson';

const Profile = () => {
	const [name, setName] = useState('');
	return (
		<div className="container-fluid" id="profile">
			<PageTitle title="Institution profile" />
			<div className="row">
				<InstitutionProfile setName={setName}></InstitutionProfile>
				<div className="col-xl-4 col-lg-4" id="institution">
					<FormHelpCard name={name}></FormHelpCard>
				</div>
				<AuthorizedPerson setName={setName}></AuthorizedPerson>
			</div>
		</div>
	);
};

export default Profile;
