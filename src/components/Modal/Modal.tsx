import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import React from 'react';
import exclamation from './../../img/exclamation.svg';

interface Cert {
	type: string;
	certificateTitle: string;
	unitId: string;
	unitTitle: string;
	shortDescription: string;
	fullDescriptionURI: string;
	value: string;
	unitMeasurement: string;
}

interface Person {
	id: string;
	firstName: string;
	lastName: string;
	ethAddress: string;
	eduCTXid: string;
}

interface CA {
	fullName: string;
	logoURI: string;
	ethAddress: string;
}

interface Certificate {
	eductxVersion: string;
	timestamp: string;
	person: Person;
	ca: CA;
	certificate: Cert;
}
interface Props {
	show: boolean;
	onClose: any;
	cert: Certificate;
	issue: any;
}
const IssueModal: React.FC<Props> = (props: Props) => {
	return (
		<div>
			<Modal show={props.show} onHide={props.onClose}>
				<Modal.Header closeButton>
					<Modal.Title className="font-weight-semibold">
						Review
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="pl-4 pt-4 mt-0 pr-4">
					<p>Certificate</p>
					<p>
						<span className="font-weight-regular small">
							Title:
						</span>
						<span className="font-weight-light small">
							{' '}
							{props.cert.certificate.unitTitle}
						</span>
					</p>
					<p>
						<span className="font-weight-regular small">
							Unit ID:
						</span>
						<span className="font-weight-light small">
							{' '}
							{props.cert.certificate.unitId}
						</span>
					</p>
					<p>
						<span className="font-weight-regular small">
							Achievement:
						</span>
						<span className="font-weight-light small">
							{' '}
							{props.cert.certificate.certificateTitle}
						</span>
					</p>
					<p>
						<span className="font-weight-regular small">
							Certificate short description:
						</span>
						<span className="font-weight-light small">
							{' '}
							{props.cert.certificate.shortDescription}
						</span>
					</p>
					<p>
						<span className="font-weight-regular small">
							Long description URI:
						</span>
						<span className="font-weight-light small">
							{' '}
							{props.cert.certificate.fullDescriptionURI}
						</span>
					</p>
					<p>
						<span className="font-weight-regular small">
							Certificate type:
						</span>
						<span className="font-weight-light small">
							{' '}
							{props.cert.certificate.type}
						</span>
					</p>
					<p>
						<span className="font-weight-regular small">
							Measurement unit:
						</span>
						<span className="font-weight-light small">
							{' '}
							{props.cert.certificate.unitMeasurement}
						</span>
					</p>
					<p>
						<span className="font-weight-regular small">
							Value:
						</span>{' '}
						<span className="font-weight-light small">
							{props.cert.certificate.value}
						</span>
					</p>

					<hr
						style={{
							marginLeft: '-1.5rem',
							marginRight: '-1.5rem',
						}}
					/>
					<p>Receiver</p>
					<p>
						<span className="font-weight-regular small">
							Recipient EduCTX ID:
						</span>
						<span className="font-weight-light small">
							{' '}
							{props.cert.person.eduCTXid}
						</span>
					</p>
					<p>
						<span className="font-weight-regular small">
							Student ID:
						</span>
						<span className="font-weight-light small">
							{' '}
							{props.cert.person.id}
						</span>
					</p>
					<p>
						<span className="font-weight-regular small">
							First name:
						</span>
						<span className="font-weight-light small">
							{' '}
							{props.cert.person.firstName}
						</span>
					</p>
					<p>
						<span className="font-weight-regular small">
							Last name:
						</span>
						<span className="font-weight-light small">
							{' '}
							{props.cert.person.lastName}
						</span>
					</p>
				</Modal.Body>
				<Modal.Footer>
					<div className="col-lg-12">
						<div className="row text-midgrey">
							<div className="col-md-1 col-lg-1 ">
								<img
									className="nav-icon"
									src={exclamation}
									alt="exclamation"
									style={{ marginTop: '0rem' }}
								/>
							</div>
							<div className="col-md-10 col-lg-10 pl-0">
								<p className="small inline">
									Please recheck information carefuly and be
									aware that the certificates cannot be edited
									after issuing.
								</p>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-lg-5" id="discard">
								<Button
									variant="secondary"
									onClick={props.onClose}
								>
									DISCARD
								</Button>
							</div>
							<div className="col-lg-5">
								<Button variant="primary" onClick={props.issue}>
									ISSUE
								</Button>
							</div>
						</div>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

// render(Modal);
export default IssueModal;
