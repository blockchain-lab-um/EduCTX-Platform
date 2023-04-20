import React from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
//import HelpTimeline from '../../components/HelpTimeline/HelpTimeline';
//import FAQ from '../../components/FAQ/FAQ';
import StillHaveQuestions from '../../components/StillHaveQuestions/StillHaveQuestions';

const HelpNewCertificate: React.FC = () => {
	return (
		<div>
			<div>
				<div className="container-fluid " id="my-certificates">
					<PageTitle title="Issue new certificate" />
					<div className="pl-4"></div>

					<div className="pl-2">
						<StillHaveQuestions></StillHaveQuestions>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HelpNewCertificate;
