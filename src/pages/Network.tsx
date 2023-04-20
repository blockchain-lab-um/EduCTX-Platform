import React from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import Network from '../components/Network/Network';
import NetworkCard from '../components/NetworkCard/NetworkCard';

const NetworkPage: React.FC = () => {
	return (
		<div className="container-fluid" id="network">
			<PageTitle title="Network" />
			<div className="row mr-4 pr-3 mb-4">
				<Network></Network>
			</div>
			<div className="row mt-4">
				<div className="col-xl-12 col-lg-12 pr-4">
					<PageTitle title="Institutions" />
					<NetworkCard></NetworkCard>
				</div>
			</div>
		</div>
	);
};

export default NetworkPage;
