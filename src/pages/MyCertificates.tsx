import React from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import MyCertificates from '../components/MyCertificates/MyCertificates';

const MyCertificatesPage: React.FC = () => {
	return (
		<div className="container-fluid " id="my-certificates">
			<PageTitle title="My Certificates" />
			<div className="row pr-4">
				<div className="col-xl-12 col-lg-12">
					<MyCertificates></MyCertificates>
				</div>
			</div>
		</div>
	);
};

export default MyCertificatesPage;
