import React from 'react';
import './FAQ.css';
import { Row, Col, Card } from 'react-bootstrap';

interface Props {
	title: string;
	children?: any | any[];
}
const FAQ: React.FC<Props> = (props) => {
	return (
		<Row className="row  mb-4 " id="help-page">
			<Col className="col-xl-12 col-md-12 offset-s-1 p-4">
				<Card className="card pb-4" id="faq">
					{/* Card Body */}
					<Col className="col-xl-12 col-md-12 offset-s-1 ">
						<Card.Body className=" card-body  justify-content-between text-center pb-4">
							<p className="heading-card text-left pb-0 mb-0 pt-1 font-weight-semibold">
								{props.title}
							</p>
						</Card.Body>
						{props.children}
					</Col>
				</Card>
			</Col>
		</Row>
	);
};

export default FAQ;
