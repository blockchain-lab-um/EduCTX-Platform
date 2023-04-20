import React from 'react';
import './Card404.css';
import bug from './../../img/bug-big.svg';
import { Row, Col, Card } from 'react-bootstrap';

const Card404: React.FC = () => {
	return (
		<Col className="col-xl-12 col-lg-12 mb-0 my-auto">
			<Card className=" p-0" id="card-404">
				{/* Card Body */}
				<Card.Body
					className="card-body justify-content-between text-center pt-4 mt-4"
					style={{ padding: '0.7rem' }}
				>
					{/* Illustration */}
					<div id="bug-illustration">
						<img
							className="img-fluid mb-4 pt-4"
							style={{ width: '30%' }}
							src={bug}
							alt="trouble"
						/>
					</div>
					{/* Heading */}
					<div className="mb-4 mt-4">
						<h6 className="heading-card text-center text-xlg">
							Oops, something went wrong.
						</h6>
					</div>
					<Row className="row green-bg justify-content-center mb-3 pl-0 pr-0 ">
						<h5 className="text-midgrey big pt-0 pb-0">404</h5>
					</Row>
					{/* Heading */}
					<div>
						<a
							href="https://eductx.org"
							className="small text-center text-lightgrey font-weight-lighter "
						>
							Contact support
						</a>
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default Card404;
