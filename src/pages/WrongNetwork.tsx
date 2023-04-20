import React, { useState } from 'react';
import PageTitle from '../components/PageTitle/PageTitle';

const WrongNetwork: React.FC = () => {
	return (
		<div className="container-fluid" id="wrongNetwork">
			<PageTitle title="wrong network" />
			<p>
				You need to connect to the right network before you can start
				using our platform!
			</p>
		</div>
	);
};

export default WrongNetwork;
