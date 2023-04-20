import React from 'react';
import './InfoCard.css';
import info from './../../img/exclamation-mark.svg';
import { Row, Col, Card } from 'react-bootstrap';

interface Props {
	children: string;
	className?: any;
}

const InfoCard: React.FC<Props> = (props) => {
	return (
		<Row className={'mb-0 mb-3 mt-0 pt-0 pl-1 pr-4 ' + props.className}>
			<Col
				className="col-xl-12 offset-l-1 card border-left-success mt-0 h-100"
				id="cert-check"
			>
				<Card.Body className="card-body">
					<Row className="no-gutters align-items-center">
						<img
							className="img-fluid "
							style={{ width: '2rem' }}
							src={info}
							alt="info"
							id="info"
						/>
						<Col className=" ml-2">
							<Row className="row-no-flex m-0 p-1 pb-0">
								<p className="mb-1 mt-1 p-0 mr-2">
									{props.children}
								</p>
							</Row>
						</Col>
					</Row>
				</Card.Body>
			</Col>
		</Row>
	);
};

export default InfoCard;
