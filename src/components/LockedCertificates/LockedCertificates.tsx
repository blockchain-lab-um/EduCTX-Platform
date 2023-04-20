import React, { useState, ChangeEvent } from 'react';
import './LockedCertificates.css';
import { Col, Card } from 'react-bootstrap';
import locked from './../../img/locked.png';
import { Link } from 'react-router-dom';

interface IProps {
	number: number;
	decrypt: any;
}

const LockedCertificates: React.FC<IProps> = (props: IProps) => {
	const [privateKey, setPrivateKey] = useState('');
	const [valid, setValid] = useState(false);

	const handlePKChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPrivateKey(e.target.value);
		if (e.target.value.length !== 64) {
			setValid(false);
		} else {
			setValid(true);
		}
	};

	return (
		<div>
			<Col className="col-xl-12 col-lg-12 mb-0 pl-0 my-auto">
				<Card className="card" id="card-login">
					{/* Card Body */}
					<Card.Body className="card-body align-self-center justify-content-between text-center">
						{/* Illustration */}
						<div id="locked-illustration">
							<img
								className="img-fluid"
								src={locked}
								style={{ width: '40% !important' }}
								alt=""
							/>
						</div>
						{/* Heading */}
						<div className="margin-bottom-small">
							<h6 className="heading-card text-center text-xlg">
								Have a quick look at your certificates
							</h6>
						</div>
						{/* Content */}
						<p className="font-weight-light text-center my-1 text-grey">
							You have <b>{props.number} certificates.</b>
							<br />
							To unlock your data please enter your private key.
						</p>
						{/* Password Input */}
						{/*                         <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3  my-md-1 mw-100 form-control-range-password">
						 */}{' '}
						<div className="input-group align-self-center justify-content-between my-md-3">
							<input
								type="password"
								className="form-control bg-white border-grey border-dark"
								aria-label="Password"
								aria-describedby="basic-addon2"
								maxLength={64}
								value={privateKey}
								onChange={handlePKChange}
							/>
						</div>
						<button
							disabled={!valid}
							className="btn btn-success my-1"
							onClick={() => props.decrypt(privateKey)}
						>
							<span className=" font-weight-normal">DECRYPT</span>
						</button>
						{/*                         </form>
						 */}{' '}
						{/* Heading */}
						<div>
							<Link
								to="/help/export-certifcate"
								className="small text-center text-lightgrey font-weight-lighter "
							>
								Where do I find my private key?
							</Link>
						</div>
					</Card.Body>
					<div className="clearfix"></div>
				</Card>
			</Col>
		</div>
	);
};

export default LockedCertificates;
