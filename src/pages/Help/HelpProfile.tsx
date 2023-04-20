import React from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
//import HelpVideo from "../../components/HelpVideo/HelpVideo";
import StillHaveQuestions from '../../components/StillHaveQuestions/StillHaveQuestions';
//import { Col, Tab, Nav } from "react-bootstrap";
import FAQ from '../../components/FAQ/FAQ';
import FAQSection from '../../components/FAQ/FAQSection';

const HelpProfile: React.FC = () => {
	return (
		<div>
			<div>
				<div className="container-fluid " id="my-certificates">
					<PageTitle title="Edit profile" />
					<div className="pl-4"></div>

					<div className="pl-2">
						<StillHaveQuestions></StillHaveQuestions>
					</div>
					<div className="pl-2">
						<FAQ title="Frequently asked questions">
							<FAQSection
								title="Which users have profiles?"
								id="ac-1"
							>
								Only certified authorities have profiles.
							</FAQSection>
							<FAQSection
								title="Where is the profile used?"
								id="ac-2"
							>
								Information obtained from the profile of
								certified authority is used in each certificate
								they issue.
							</FAQSection>
							<FAQSection
								title="When will the change in my profile be seen?"
								id="ac-3"
							>
								Changes of profile do not affect the
								certificates you issued in the past - they will
								still show the old information about your
								certified authority profile.
							</FAQSection>
						</FAQ>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HelpProfile;
