import React from 'react';
import './StillHaveQuestions.css';
import { Row, Col, Card } from 'react-bootstrap';
import helpBig from './../../img/help-big.svg';

const StillHaveQuestions: React.FC = () => {
	return (
		<Row className="row mr-0 mb-4 mt-2" style={{ width: '100%' }}>
			<Col className="col-xl-12 col-md-12 offset-s-1 pl-4 mb-4">
				<Card
					className="card padding-bottom-small  pl-2"
					id="help-contact"
				>
					{/* Card Body */}
					<Col className="col-xl-12 col-md-12 offset-s-1 ">
						<Row className="row " id="help-img">
							<Col className=" col-xl-12 col-md-12 col-sm-12">
								<img
									className="img-fluid p-2 pl-4"
									src={helpBig}
									alt=""
								/>
							</Col>
						</Row>
						<Row className="row">
							<Card.Body className=" card-body align-self-center justify-content-between text-center mb-4">
								<p className="card-title h5">
									Still have questions?
								</p>
								<p className=" text-center text-midgrey pb-0 mb-0 pt-1 font-weight-normal">
									If you need more help, feel free to email us
									to <br />{' '}
									<a href="mailto:blockchain-lab@um.si">
										blockchain-lab@um.si
									</a>
								</p>
							</Card.Body>
						</Row>
					</Col>
				</Card>
			</Col>
		</Row>
	);
};

export default StillHaveQuestions;
