import React from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import HelpVideo from '../../components/HelpVideo/HelpVideo';
import StillHaveQuestions from '../../components/StillHaveQuestions/StillHaveQuestions';
import { Image, Col, Tab, Nav } from 'react-bootstrap';
import FAQ from '../../components/FAQ/FAQ';
import FAQSection from '../../components/FAQ/FAQSection';

const HelpExport: React.FC = () => {
	return (
		<div>
			<div>
				<div className="container-fluid " id="my-certificates">
					<PageTitle title="Export certificates" />
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
											Add metamask
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="second">
											Meta-mask configuration
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="third">
											Where to find private-key
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="fourth">
											Renaming certificate
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</Col>
							<Col sm={9}>
								<Tab.Content>
									<Tab.Pane eventKey="first">
										<video controls>
											<source
												src="/add metamask-blur.mp4"
												type="video/mp4"
											/>
											Your browser does not support the
											video tag.
										</video>
									</Tab.Pane>
									<Tab.Pane eventKey="second">
										<video controls>
											<source
												src="/meta-mask.mp4"
												type="video/mp4"
											/>
											Your browser does not support the
											video tag.
										</video>
									</Tab.Pane>
									<Tab.Pane eventKey="third">
										<video controls>
											<source
												src="/private-key.mp4"
												type="video/mp4"
											/>
											Your browser does not support the
											video tag.
										</video>
									</Tab.Pane>
									<Tab.Pane eventKey="fourth">
										<video controls>
											<source
												src="/allowed-renaming.mp4"
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
								title="Where do I find my private key?"
								id="ac-1"
							>
								Your private key can be obtained from digital
								Ethereum wallet such as Metamask. <br />
								<br />
								1. Open Metamask plugin in your taskbar in
								browser and click on Hamburger menu. <br />
								<br />
								<Image
									className="slikice_pomoc"
									src="/my_private_key.png"
									rounded
								/>
								<br />
								<br />
								2. Click on button Details in the middle of the
								screen. <br />
								<br />
								<Image
									className="slikice_pomoc"
									src="/details.png"
									rounded
								/>
								<br />
								<br />
								3. A pop-up window will appear - choose “Export
								private key” option and enter your Metamask
								password. <br />
								<br />
								<Image
									className="slikice_pomoc"
									src="/export.png"
									rounded
								/>
								<br />
								<br />
								4. Copy the private key which will appear in the
								text area in the middle. <br />
								<br />
								<Image
									className="slikice_pomoc"
									src="/export.png"
									rounded
								/>
							</FAQSection>
							<FAQSection
								title="How to rename the certificate without deeming it invalid?"
								id="ac-2"
							>
								Certificate export produces certificate package
								in the form of .zip file. You are allowed to
								rename this file and any files within the
								package. However you are not allowed to alter
								the content of json file in the package.
							</FAQSection>
							<FAQSection
								title="Can I delete certificates from package?"
								id="ac-3"
							>
								Yes. If you only delete the pdf certificates
								from the package, the certificate will still be
								listed among others. In order to delete the
								certificate from the package entirely, delete
								the pdf and json file.
							</FAQSection>
							<FAQSection
								title="Can the issuer of the certificate export my certificate?"
								id="ac-3"
							>
								No, only the receiver can manage and export
								their certificates.
							</FAQSection>
						</FAQ>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HelpExport;
