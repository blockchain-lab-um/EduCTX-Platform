import React from 'react';
import './HelpVideo.css';
import { Row, Col, Card, Tab } from 'react-bootstrap';

const HelpVideo: React.FC = (props: any) => {
	return (
		<Row className="row my-0 mb-4">
			<Col className="col-xl-12 col-md-12 offset-s-1 ">
				<Card className="card  " id="help-search">
					{/* Card Body */}
					<Col className="col-xl-12 col-md-12 offset-s-1 ">
						<div className=" card-body align-self-center justify-content-between text-center mb-4">
							<p className="heading-card font-weight-semibold text-left pb-1 pt-1">
								Tutorials
							</p>
							<div
								className=" card-body align-self-center justify-content-between text-center  p-0"
								id="card-border"
							>
								{/* Heading */}
								<div className="row ">
									<div
										className="col-xl-12 col-lg-12 col-md-12 p-0 m-0"
										id="help-tabs"
									>
										<div className="row" id="accordion">
											{/* <div class="container"> */}
											<Tab.Container
												id="left-tabs-example"
												defaultActiveKey="first"
											>
												{props.children}
											</Tab.Container>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Col>
				</Card>
			</Col>
		</Row>
	);
};

export default HelpVideo;
