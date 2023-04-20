import React from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import HelpVideo from '../../components/HelpVideo/HelpVideo';
import FAQ from '../../components/FAQ/FAQ';
import StillHaveQuestions from '../../components/StillHaveQuestions/StillHaveQuestions';
import FAQSection from '../../components/FAQ/FAQSection';
import HelpTimelineItem from '../../components/HelpTimeline/HelpTimelineItem';
import HelpTimeline from '../../components/HelpTimeline/HelpTimeline';
import { Row, Col, Tab, Nav } from 'react-bootstrap';

const HelpVerify: React.FC = () => {
	return (
		<div>
			<div>
				<div className="container-fluid " id="my-certificates">
					<PageTitle title="Verify certificate" />
					<div className="pl-4">
						<HelpVideo>
							<Col sm={3}>
								<Nav
									variant="pills"
									className="flex-column"
									id="tabs-help"
								>
									<Nav.Item>
										<Nav.Link eventKey="first">
											Verify a certificate
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="second">
											Verification for non-registered user
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</Col>
							<Col sm={9}>
								<Tab.Content>
									<Tab.Pane eventKey="first">
										<video controls>
											<source
												src="/verify-certificate.mp4"
												type="video/mp4"
											/>
											Your browser does not support the
											video tag.
										</video>
									</Tab.Pane>
									<Tab.Pane eventKey="second">
										<video controls>
											<source
												src="/verification-non-registered.mp4"
												type="video/mp4"
											/>
											Your browser does not support the
											video tag.
										</video>
									</Tab.Pane>
								</Tab.Content>
							</Col>
						</HelpVideo>
					</div>

					<div className="pl-2">
						<StillHaveQuestions></StillHaveQuestions>
					</div>
					<div className="pl-2">
						<FAQ title="Frequently asked questions">
							<FAQSection
								title="How many certificates can I verify at once?"
								id="ac-1"
							>
								You can verify as many certificates as you wish
								from one user at a time, as long as they are
								archived in the zip file.
							</FAQSection>
							<FAQSection
								title="Do I have to be logged in to verify a certificate?"
								id="ac-2"
							>
								No, you don’t have to be logged in, anyone can
								verify certificates.
							</FAQSection>
							<FAQSection
								title="How do I know which certificate in the pack is invalid?"
								id="ac-3"
							>
								The invalid certificate(s) will be marked in the
								report table.
							</FAQSection>
							<FAQSection
								title="Can I see the history of verified certificates?"
								id="ac-4"
							>
								No, you can only see the results of current
								verification.
							</FAQSection>
							<FAQSection
								title="Can I know which part of the certificate is invalid?"
								id="ac-5"
							>
								You can identify the invalid certificate within
								the zip archive. Each certificate is encrypted
								as a whole, which means that the platform only
								verifies if the certificate is the same as the
								one stored in blockchain network. To understand
								more about it, read How does certificate
								verification work.
							</FAQSection>
							<FAQSection
								title="Can I rename the package (.zip) file?"
								id="ac-6"
							>
								Yes, you can rename all the files (zip or
								certificate files within), but you are not
								allowed to edit them. Any kind of changes will
								deem the file invalid.
							</FAQSection>
						</FAQ>
					</div>
					<div className="pl-2">
						<HelpTimeline title="Want to know more?">
							<HelpTimelineItem title="01. How does certificate verification work">
								<Row className="row justify-content-between">
									<Col
										className="col-lg-6 col-md-12 medium font-weight-normal pr-4 pl-2 pt-2"
										style={{ textAlign: 'justify' }}
									>
										When the certificate is created, the
										system encrypts it using the recipient's
										public key. After that, the
										certificate’s hash value is obtained.
										This hash value is then permanently
										saved to the blockchain network. When
										the user wants to verify the
										certificate, its hash value is compared
										to the hash value of the certificate
										stored in the blockchain network. In the
										case that the provided hash value is not
										equal to the obtained hash value from
										the blockchain network, the verification
										fails. Otherwise, the user’s provided
										certificate is successfully verified.
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
							<HelpTimelineItem title="02. Multiple certificate verification">
								<Row className="row justify-content-between">
									<Col
										className="col-lg-6 col-md-12 medium font-weight-normal pr-4 pl-2 pt-2"
										style={{ textAlign: 'justify' }}
									>
										EduCTX offers verification of multiple
										certificates from the same user at the
										same time. User has the option to export
										as many certificates as he wants. All
										the selected certificates are archived
										in the zip file.
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
							<HelpTimelineItem title="03. What can I do if my certificate is invalid?">
								<Row className="row justify-content-between">
									<Col
										className="col-lg-6 col-md-12 medium font-weight-normal pr-4 pl-2 pt-2"
										style={{ textAlign: 'justify' }}
									>
										If the certificate is marked as invalid
										it means that it has been changed. You
										are not allowed to edit the
										certificates, you are only allowed to
										rename the archive or individual files.
										You can always check the validity of
										your certificate archive by uploading it
										to the platform.
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

export default HelpVerify;
