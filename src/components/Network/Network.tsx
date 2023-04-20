import React from 'react';
import './Network.css';
import { Row, Col, Card } from 'react-bootstrap';
import network from './../../img/nework-illustration@2x.png';

const Network: React.FC = () => {
	return (
		<div className="col-xl-12 col-lg-12 ml-4" id="network-first-row">
			<Row className=" my-0">
				<Col className="col-xl-12 offset-s-1 ">
					<Card
						className=" border-bottom-primary card-big"
						id="networkmy-cert"
					>
						{/* Card Body */}
						<Card.Body className=" card-body align-self-center justify-content-between text-center">
							{/* Illustration */}
							<div className=" mt-3 mb-4" id="network-happy">
								<img
									className="img-fluid"
									src={network}
									alt=""
								/>
							</div>
							{/* Heading */}
							<div className="margin-bottom-small">
								<h6 className="heading-card text-center text-xlg">
									Our network is growing!
								</h6>
							</div>
							<p className="font-weight-light text-center text-grey">
								EduCTX is a young platform, but each year more
								institutions recognize
								<br />
								the value and potential of our work.
							</p>
						</Card.Body>

						<Row
							className="green-slide pt-2 pb-0  pl-3 font-weight-light "
							id="margin-2b"
						>
							<p
								className=" mb-2 pt-1 pl-3 pr-2"
								id="cert-get-details"
							>
								Find out more! Visit our website and explore the
								story behind EduCTX.
							</p>
							<div className="pb-1" id="explore">
								<a
									href="https://eductx.org/"
									className="btn btn-white pr-3"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span className="font-weight-semibold ">
										EXPLORE
									</span>
								</a>
							</div>
						</Row>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Network;
