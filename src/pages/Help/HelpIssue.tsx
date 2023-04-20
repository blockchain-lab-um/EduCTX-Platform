import React from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import HelpVideo from '../../components/HelpVideo/HelpVideo';
import StillHaveQuestions from '../../components/StillHaveQuestions/StillHaveQuestions';
import { Col, Tab, Nav } from 'react-bootstrap';

const HelpIssue: React.FC = () => {
	return (
		<div>
			<div>
				<div className="container-fluid " id="my-certificates">
					<PageTitle title="Issu new certificate" />
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
											Issue a certificate
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="second">
											Issue multiple certificates
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="third">
											Invalid certificates
										</Nav.Link>
									</Nav.Item>
								</Nav>
							</Col>
							<Col sm={9}>
								<Tab.Content>
									<Tab.Pane eventKey="first">
										<video controls>
											<source
												src="/video.mp4"
												type="video/mp4"
											/>
											Your browser does not support the
											video tag.
										</video>
									</Tab.Pane>
									<Tab.Pane eventKey="second">
										<video controls>
											<source
												src="/video.mp4"
												type="video/mp4"
											/>
											Your browser does not support the
											video tag.
										</video>
									</Tab.Pane>
									<Tab.Pane eventKey="third">
										<video controls>
											<source
												src="/video.mp4"
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
				</div>
			</div>
		</div>
	);
};

export default HelpIssue;
