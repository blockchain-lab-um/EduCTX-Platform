import React from 'react';
import './IssueNewCertificateCard.css';
import { Row, Col, Card } from 'react-bootstrap';
import addBig from './../../img/add-big.svg';
import { Link } from 'react-router-dom';

const IssueNewCertificateCard: React.FC = () => {
	return (
		<div className="col-xl-9 col-lg-8 col-md-12" id="index">
			<Card className="card mb-4 card-upper-third ml-2" id="new-cert">
				{/* Card Body */}
				<Card.Body className="card-body pl-3 inline">
					<Row className=" row no-gutters my-0 ">
						<Col className="col-lg-4 col-md-4">
							<img
								className="img-fluid text-left"
								src={addBig}
								alt="add-certificate"
								id="add-cert-img"
							/>
						</Col>
						<Col className="col-lg-8 col-md-8" id="text-area">
							<h6 className="m-0 heading-card  left leftleft text-lg pt-3 pb-1">
								Issue new certificate
							</h6>
							<p className="font-weight-light mb-2 left leftleft ">
								Start from scratch or use an existing template.
							</p>
							<Link to="/issue" className="btn btn-success">
								ISSUE
							</Link>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</div>
	);
};

export default IssueNewCertificateCard;
