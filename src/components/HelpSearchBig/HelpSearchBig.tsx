import React from 'react';
import './HelpSearchBig.css';
import { Row, Col, Card } from 'react-bootstrap';

const HelpSearchBig: React.FC = () => {
	return (
		<Row className="row my-0 mb-4 pl-4" id="help-search-big">
			<Col className="col-xl-12 col-md-12 col-sm-12 col-xs-12 offset-s-1 ">
				<Card className="card pb-4 " id="help-search">
					{/* Card Body */}
					<Card.Body className=" card-body align-self-center justify-content-between text-center mb-4 pb-4">
						{/* Heading */}
						<div className="margin-bottom-small">
							<h6 className="heading-card text-center text-xlg mt-4 pt-4 pb-2">
								How can we help you?
							</h6>
						</div>
						<p className="font-weight-light text-center text-grey">
							Let us help you experience EduCTX to the fullest.
							<br />
							Browse trough our user help library or search for
							the terms.
						</p>
						<div
							className="has-search my-0"
							style={{ width: '100 %' }}
						>
							<span
								className="fa fa-search form-control-feedback pb-1"
								style={{ marginTop: '0.1rem', width: '100 %' }}
							/>
							<input
								type="search"
								className="form-control bg-white border-grey border-primary small"
								id="search-grey"
							/>
						</div>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default HelpSearchBig;
