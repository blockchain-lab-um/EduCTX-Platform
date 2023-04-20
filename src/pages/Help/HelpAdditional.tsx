import React from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
//import HelpVideo from "../../components/HelpVideo/HelpVideo";
import FAQ from '../../components/FAQ/FAQ';
import StillHaveQuestions from '../../components/StillHaveQuestions/StillHaveQuestions';
import FAQSection from '../../components/FAQ/FAQSection';
//import { Col, Tab, Nav } from "react-bootstrap";

const HelpAdditional: React.FC = () => {
	return (
		<div>
			<div>
				<div className="container-fluid " id="my-certificates">
					<PageTitle title="Additional functionalities" />
					<div className="pl-4"></div>
					<div className="pl-2">
						<StillHaveQuestions></StillHaveQuestions>
					</div>
					<div className="pl-2">
						<FAQ title="Frequently asked questions">
							<FAQSection
								title="What additional functionalities do you offer through API?"
								id="ac-1"
							>
								Additional functionalities we offer through API
								include batch issuing of certificates,
								certificate revocation and customization of
								platform to your own organization needs.
							</FAQSection>
							<FAQSection
								title="Is the use of API free?"
								id="ac-2"
							>
								At the moment the use of API is not free, but is
								included for some partner institutions. To find
								out more about your options, please contact us
								at blockchain-lab@um.si.
							</FAQSection>
						</FAQ>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HelpAdditional;
