import React from 'react';
import './HelpCard.css';
import questionMark from './../../img/question-mark.svg';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HelpCard: React.FC = () => {
	return (
		<Card className=" col-xl-12 pr-4 ml-0 pb-0 mb-0" id="card-help">
			{/* Card Body */}
			<Card.Body className="card-body text-center">
				<div>
					<img className="img-fluid " src={questionMark} alt="" />
				</div>
				<div>
					<h6 className="heading-card text-center text-xlg ">
						Need help?
					</h6>
				</div>
				<div>
					<p className="font-weight-light text-center text-midgrey ">
						Don't worry if you feel lost, <br /> our &nbsp;
						<Link to="/help/export-certifcate">
							<u>help guides</u>{' '}
						</Link>
						are here to assist you.
					</p>
				</div>
			</Card.Body>
		</Card>
	);
};

export default HelpCard;
