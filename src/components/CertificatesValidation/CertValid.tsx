import React from 'react';
import './CertValid.css';
import tick from './../../img/tick.svg';
import invalid from './../../img/invalid.svg';
import { Row, Col, Card } from 'react-bootstrap';

interface Props {
	valid?: Boolean;
	children: string;
	className?: any;
}

const CertValid: React.FC<Props> = (props) => {
	let valid: Boolean | undefined = props.valid;

	if (valid) {
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
								src={tick}
								alt="tick"
								id="tick"
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
	} else {
		return (
			<Row className={'row mb-3 pl-1 pr-4 mt-0 pt-0 ' + props.className}>
				<Col
					className="col-xl-12 offset-l-1 card border-left-danger mt-0 pt-0 h-100"
					id="cert-check-invalid"
				>
					<Card.Body className=" card-body">
						<Row className="no-gutters ">
							<Col className="col-auto">
								<img
									className="img-fluid "
									style={{ width: '2rem' }}
									src={invalid}
									alt=""
									id="tick"
								/>
							</Col>
							<Col className="ml-2">
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
	}
};

export default CertValid;
