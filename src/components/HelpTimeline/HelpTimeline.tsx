import React from 'react';
import './HelpTimeline.css';
import { Row, Col, Card } from 'react-bootstrap';

interface Props {
	title: string;
	children?: any | any[];
}

const HelpTimeline: React.FC<Props> = (props) => {
	return (
		<Row
			className="row mt-4 pr-4"
			style={{ width: '100% !important', paddingLeft: '0.25rem' }}
			id="timeline-help"
		>
			<Col className="col-xl-12 col-md-12 offset-s-1 p-4">
				<Card className="card padding-bottom-small pb-4">
					<Col className="col-xl-12 col-md-12 offset-s-1 ">
						<div className=" card-body align-self-center justify-content-between text-center">
							<p className="heading-card text-left font-weight-semibold pb-0 mb-0 pt-1">
								{props.title}
							</p>
						</div>
						<ul className="timeline">{props.children}</ul>
					</Col>
				</Card>
			</Col>
		</Row>
	);
};

export default HelpTimeline;
