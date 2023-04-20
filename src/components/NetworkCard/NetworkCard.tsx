import React from 'react';
import './NetworkCard.css';
import { Card, CardDeck } from 'react-bootstrap';
import umlogo from './../../img/um-logo.svg';
import sarajevologo from './../../img/sarajevo-full.png';
import fachhochschule from './../../img/1200px-Fachhochschule_Bielefeld-logo.svg.png';
import brno from './../../img/brno.png';

const NetworkCard: React.FC = () => {
	return (
		<CardDeck
			id="network-cards"
			className="justify-content-between text-center mb-4 pb-2"
		>
			<Card>
				<Card.Img variant="top" src={umlogo} style={{ width: '50%' }} />
				<Card.Body>
					<Card.Title>University of Maribor</Card.Title>
					<Card.Text>Slovenia</Card.Text>
				</Card.Body>
			</Card>
			<Card>
				<Card.Img
					variant="top"
					src={sarajevologo}
					style={{ width: '60%', marginTop: '1.5rem' }}
				/>
				<Card.Body>
					<Card.Title>Elektrotehnički fakultet Sarajevo</Card.Title>
					<Card.Text>Bosnia and Herzegovina</Card.Text>
				</Card.Body>
			</Card>
			<Card>
				<Card.Img
					variant="top"
					style={{ width: '40%', marginTop: '1.1rem' }}
					src={fachhochschule}
				/>
				<Card.Body>
					<Card.Title>FH Bielefeld</Card.Title>
					<Card.Text>Germany</Card.Text>
				</Card.Body>
			</Card>
			<Card>
				<Card.Img
					variant="top"
					style={{ width: '60%', marginTop: '2.7rem' }}
					src={brno}
				/>
				<Card.Body>
					<Card.Title>Brno University of Technology</Card.Title>
					<Card.Text>Czech Republic</Card.Text>
				</Card.Body>
			</Card>
		</CardDeck>
	);
};

export default NetworkCard;
