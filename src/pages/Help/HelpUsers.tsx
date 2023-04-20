import React from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
//import HelpVideo from "../../components/HelpVideo/HelpVideo";
import HelpTimeline from '../../components/HelpTimeline/HelpTimeline';
import FAQ from '../../components/FAQ/FAQ';
import FAQSection from '../../components/FAQ/FAQSection';
import HelpTimelineItem from '../../components/HelpTimeline/HelpTimelineItem';
import StillHaveQuestions from '../../components/StillHaveQuestions/StillHaveQuestions';
import { Image, Row, Col } from 'react-bootstrap';

const HelpUsers: React.FC = () => {
	return (
		<div>
			<div>
				<div className="container-fluid " id="my-certificates">
					<PageTitle title="Users and access" />
					<div className="pl-4"></div>

					<div className="pl-2">
						<StillHaveQuestions></StillHaveQuestions>
					</div>
					<div className="pl-2">
						<FAQ title="Frequently asked questions">
							<FAQSection
								title="How can I obtain Ethereum addresses of users?"
								id="ac-1"
							>
								Ethereum address is saved in Metamask (or
								similar wallet). If you are using Metamask click
								on the icon in your browser toolbar. Then click
								on your account name and the Ethereum address
								will be copied to clipboard.
							</FAQSection>
							<FAQSection
								title="How do I identify users from their Ethereum address?"
								id="ac-2"
							>
								In order to keep the personal data secured to
								the best possible extent, we do not connect
								Ethereum addresses to names. Therefore, we
								recommend keeping your own database, which
								connects names to Ethereum addresses.
							</FAQSection>
							<FAQSection
								title="Can authorized persons see the list of all authorized users?"
								id="ac-3"
							>
								No, the list of authorized persons is only
								visible from the profile of the certified
								institution.
							</FAQSection>
							<FAQSection
								title="What can I do if I lost my password?"
								id="ac-4"
							>
								Houston, We Have a Problem.
							</FAQSection>
							<FAQSection
								title="How to get student’s EduCTX ID?"
								id="ac-5"
							>
								Student’s EduCTX id is visible in the topbar.
								For faster and easier certificate issue, we
								recommend you keep a database of your students’
								EduCTX IDs.
								<br />
								<br />
								<Image src="/eductx_id.png" rounded />
							</FAQSection>
						</FAQ>
					</div>
					<div className="pl-2">
						<HelpTimeline title="Want to know more?">
							<HelpTimelineItem title="01. How is user information stored?">
								<Row className="row justify-content-between">
									<Col
										className="col-lg-6 col-md-12 medium font-weight-normal pr-4 pl-2 pt-2"
										style={{ textAlign: 'justify' }}
									>
										We store the name and logo URL of each
										institution on Ethereum Blockchain
										network. Each registered student’s
										EduCTX ID and Ethereum address is stored
										in Ethereum blockchain network. We don’t
										store any other information about EduCTX
										users.
									</Col>
									<Col className="col-lg-5 col-md-12 mr-4">
										<img
											className="img-fluid p-2"
											src="img/screenshot.svg"
											alt=""
											style={{ width: '90%' }}
										/>
									</Col>
								</Row>
							</HelpTimelineItem>
						</HelpTimeline>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HelpUsers;
