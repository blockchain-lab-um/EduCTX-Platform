import React, { ChangeEvent } from 'react';
import './IssueCertForm.css';
import { Row, Card, Button, Form, Spinner } from 'react-bootstrap';
import IssueModal from '../Modal/Modal';
import { connect } from 'react-redux';
import ValidDot from './../../img/check-mark.svg';
import InfoCard from '../InfoCard/InfoCard';
const ecies = require('eth-ecies');
const jpack = require('jsonpack');

const JSONSchema = require('../../protocol-buffer/json-shema_pb.js');
const ethUtil = require('ethereumjs-util');

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

interface IState {
	lastCert: Certificate;
	template: boolean;
	certificate: Certificate;
	show: boolean;
	publicKey: string;
	ca: boolean;
	address: string;
	validated: boolean;
	lastCertExists: boolean;
	validId: boolean;
	issued: boolean;
	submitted: boolean;
}

interface IProps {
	setName?: any;
	isCa?: any;
	isAuth?: any;
	getAuthCa?: any;
	getCaData?: any;
	getCaDataAuth?: any;
	issueCert?: any;
	issueCertAuth?: any;
	getPublicKey?: any;
	getAddress?: any;
	eventTransfer?: any;
}

class IssueCertFormRaw extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			lastCert: {
				eductxVersion: '2.0',
				timestamp: Date.now().toString(),
				person: {
					id: '',
					firstName: '',
					lastName: '',
					ethAddress: '',
					eduCTXid: '',
				},
				ca: { fullName: '', logoURI: '', ethAddress: '' },
				certificate: {
					type: '',
					certificateTitle: '',
					unitId: '',
					unitTitle: '',
					shortDescription: '',
					fullDescriptionURI: '',
					value: '',
					unitMeasurement: '',
				},
			},
			template: false,
			certificate: {
				eductxVersion: '2.0',
				timestamp: Date.now().toString(),
				person: {
					id: '',
					firstName: '',
					lastName: '',
					ethAddress: '',
					eduCTXid: '',
				},
				ca: { fullName: '', logoURI: '', ethAddress: '' },
				certificate: {
					type: '',
					certificateTitle: '',
					unitId: '',
					unitTitle: '',
					shortDescription: '',
					fullDescriptionURI: '',
					value: '',
					unitMeasurement: '',
				},
			},
			lastCertExists: false,
			show: false,
			publicKey: '',
			ca: false,
			address: '',
			validated: false,
			validId: false, // če je to false, je EduCTX ID invalid!
			issued: false,
			submitted: false,
		};
	}

	async updateState(nextProps: any) {
		try {
			let address = await nextProps.getAddress(
				this.state.certificate.person.eduCTXid
			);
			this.setState({
				address: address,
				certificate: {
					...this.state.certificate,
					person: {
						...this.state.certificate.person,
						ethAddress: address,
					},
				},
			});
			let publicKey = await nextProps.getPublicKey(
				this.state.certificate.person.eduCTXid
			);
			if (typeof publicKey !== 'undefined' && publicKey !== null) {
				this.setState({ publicKey: publicKey.substring(2) });
			}
		} catch (error) {
			console.error(error);
		}
		let isCa = await nextProps.isCa();
		let isAuth = await nextProps.isAuth();
		if (isCa) {
			this.setState({ ca: true });
			let caData = await nextProps.getCaData();
			if (typeof caData !== 'undefined') {
				this.setState({
					certificate: {
						...this.state.certificate,
						ca: {
							...this.state.certificate.ca,
							fullName: caData[1],
							logoURI: caData[0],
							ethAddress: nextProps.getCaAddress,
						},
					},
				});
			}
		} else if (isAuth) {
			this.setState({ ca: false });
			let ca = await nextProps.getAuthCa();
			let caData = await nextProps.getCaDataAuth(ca);
			if (typeof caData !== 'undefined') {
				this.setState({
					certificate: {
						...this.state.certificate,
						ca: {
							...this.state.certificate.ca,
							fullName: caData[1],
							logoURI: caData[0],
							ethAddress: nextProps.getCaAddress,
						},
					},
				});
			}
		}
	}

	async checkID(id: any) {
		let address = await this.props.getAddress(id);
		if (
			address !== '0x0000000000000000000000000000000000000000' &&
			typeof address !== 'undefined'
		) {
			this.setState({ validId: true });
		} else {
			this.setState({ validId: false });
		}
	}

	async componentWillReceiveProps(nextProps: any) {
		this.updateState(nextProps);
	}

	async componentDidMount() {
		this.updateState(this.props);
	}

	setSubmit: any = () => {
		this.setState({ issued: false, submitted: true });
	};

	setIssue: any = () => {
		this.setState({ issued: true, submitted: false });
		setInterval(() => {
			this.setState({ issued: false });
		}, 8000);
	};

	handleIssue: any = async () => {
		let timestamp = Date.now().toString();
		let certificate = this.state.certificate;
		certificate.timestamp = timestamp;
		// this.setState({ certificate: { ...this.state.certificate, eductxVersion: eductxVersion, timestamp: timestamp } });
		let certificateJSONHash = await ethUtil
			.keccak256(JSON.stringify(certificate))
			.toString('hex');
		let publicKey = this.state.publicKey;

		const certificateObject: any = new JSONSchema.Certificate();
		const personObject: any = new JSONSchema.Person();
		const caObject: any = new JSONSchema.CA();
		const certObject: any = new JSONSchema.Cert();

		const packedCert = jpack.pack(certificate).toString();
		const packedCertBuf = Buffer.from(packedCert);

		let str = await ecies
			.encrypt(Buffer.from(publicKey, 'hex'), packedCertBuf)
			.toString('hex');

		if (this.state.ca)
			await this.props.issueCert(
				certificate.person.eduCTXid,
				certificateJSONHash.toString('hex'),
				str
			);
		else
			await this.props.issueCertAuth(
				certificate.person.eduCTXid,
				certificateJSONHash.toString('hex'),
				str
			);

		this.setSubmit();
		this.setState({
			lastCert: certificate,
			lastCertExists: true,
			show: false,
			certificate: {
				eductxVersion: '',
				timestamp: '',
				person: {
					id: '',
					firstName: '',
					lastName: '',
					ethAddress: '',
					eduCTXid: '',
				},
				ca: { fullName: '', logoURI: '', ethAddress: '' },
				certificate: {
					type: '',
					certificateTitle: '',
					unitId: '',
					unitTitle: '',
					shortDescription: '',
					fullDescriptionURI: '',
					value: '',
					unitMeasurement: '',
				},
			},
		});

		this.props.eventTransfer().on('data', (event: any) => {
			if (
				this.state.address.toUpperCase() ===
				event.returnValues.to.toUpperCase()
			) {
				this.setIssue();
			}
		});
	};

	handleShow: any = () => {
		this.setState({ show: true });
		this.updateState(this.props);
	};

	handleModalClose: any = () => this.setState({ show: false });

	handleTemplateChange: any = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({ template: e.target.checked });
		if (e.target.checked)
			this.setState({ certificate: this.state.lastCert });
		else
			this.setState({
				certificate: {
					eductxVersion: '',
					timestamp: '',
					person: {
						id: '',
						firstName: '',
						lastName: '',
						ethAddress: '',
						eduCTXid: '',
					},
					ca: { fullName: '', logoURI: '', ethAddress: '' },
					certificate: {
						type: '',
						certificateTitle: '',
						unitId: '',
						unitTitle: '',
						shortDescription: '',
						fullDescriptionURI: '',
						value: '',
						unitMeasurement: '',
					},
				},
			});
	};

	handleSubmit: any = (event: any) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();
		if (form.checkValidity()) this.handleShow();
		this.setState({ validated: true });
	};

	handleTitleChange: any = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			certificate: {
				...this.state.certificate,
				certificate: {
					...this.state.certificate.certificate,
					unitTitle: e.target.value,
				},
			},
		});
	};

	handleUnitIDChange: any = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			certificate: {
				...this.state.certificate,
				certificate: {
					...this.state.certificate.certificate,
					unitId: e.target.value,
				},
			},
		});
	};

	handleAchievementChange: any = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			certificate: {
				...this.state.certificate,
				certificate: {
					...this.state.certificate.certificate,
					certificateTitle: e.target.value,
				},
			},
		});
	};

	handleShortDescriptionChange: any = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			certificate: {
				...this.state.certificate,
				certificate: {
					...this.state.certificate.certificate,
					shortDescription: e.target.value,
				},
			},
		});
	};

	handleCertTypeChange: any = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			certificate: {
				...this.state.certificate,
				certificate: {
					...this.state.certificate.certificate,
					type: e.target.value,
				},
			},
		});
	};

	handleValueChange: any = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			certificate: {
				...this.state.certificate,
				certificate: {
					...this.state.certificate.certificate,
					value: e.target.value,
				},
			},
		});
	};

	handleMeasurementUnitChange: any = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			certificate: {
				...this.state.certificate,
				certificate: {
					...this.state.certificate.certificate,
					unitMeasurement: e.target.value,
				},
			},
		});
	};

	handleRecipientIDChange: any = async (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			certificate: {
				...this.state.certificate,
				person: {
					...this.state.certificate.person,
					eduCTXid: e.target.value,
				},
			},
		});
		if (e.target.value.length === 8) {
			this.checkID(e.target.value);
		}
	};

	handleStudentIDChange: any = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			certificate: {
				...this.state.certificate,
				person: {
					...this.state.certificate.person,
					id: e.target.value,
				},
			},
		});
	};

	handleFirstNameChange: any = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			certificate: {
				...this.state.certificate,
				person: {
					...this.state.certificate.person,
					firstName: e.target.value,
				},
			},
		});
	};

	handleLastNameChange: any = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			certificate: {
				...this.state.certificate,
				person: {
					...this.state.certificate.person,
					lastName: e.target.value,
				},
			},
		});
	};

	handleURLChange: any = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			certificate: {
				...this.state.certificate,
				certificate: {
					...this.state.certificate.certificate,
					fullDescriptionURI: e.target.value,
				},
			},
		});
	};

	render() {
		return (
			<div id="cert-issue">
				{this.state.issued ? (
					<InfoCard>Certificate was successfully issued.</InfoCard>
				) : (
					''
				)}
				{this.state.submitted ? (
					<InfoCard>
						Certificate was successfully submitted to blockchain
						network and will be issued in a few seconds.
					</InfoCard>
				) : (
					''
				)}
				<Card className="card col-xl-12 offset-l-1 px-3">
					<Card.Body className="card-body p-4">
						<div className="row m-0 pb-0  ">
							<h3 className="mb-3 mt-1 pt-1 mr-2 pr-3 ">
								Certificate
							</h3>
						</div>
						<Row className="row m-0 pb-0" id="cert-issue">
							<Form
								className="needs-validation"
								noValidate
								validated={this.state.validated}
								onSubmit={this.handleSubmit}
							>
								{/*auto fill*/}
								<Form.Row className="row m-0 pb-0 small">
									<p className="mb-2">
										Same certificate, different holder:
									</p>
								</Form.Row>
								<Form.Row className="row mb-2 ml-0 pb-0 ">
									<input
										type="checkbox"
										id="template"
										name="template"
										defaultValue="on"
										onChange={this.handleTemplateChange}
										checked={this.state.template}
										disabled={!this.state.lastCertExists}
									/>
									<label
										onMouseOver={() =>
											this.props.setName(
												'Autofill - Checking this box will autofill input fields with the data of last issued certificate.'
											)
										}
										onMouseOut={() =>
											this.props.setName('')
										}
										htmlFor="template"
										className="p"
									>
										Auto-fill with data of last issued
										certificate
									</label>
								</Form.Row>
								{/*title and unit id*/}
								<Form.Row className="row m-0 pb-0 mb-4">
									<Form.Group className="col-lg-7 col-md-7 m-0 pb-0 pl-0 ">
										<Form.Row className="row m-0 pb-0">
											<Form.Label>
												<p className="mb-1 small ">
													Title:
												</p>
											</Form.Label>
										</Form.Row>
										<Form.Row className="row m-0 pb-0">
											<Form.Control
												maxLength={40}
												onFocus={() =>
													this.props.setName(
														'Title - Certificate file will be named with this title. It is recommended to use the name of the course, training or achievement e.g. Kotlin Summer School, Math 101, Certificate in Quality Management.'
													)
												}
												onBlur={() =>
													this.props.setName('')
												}
												type="text"
												id="title"
												name="certTitle"
												value={
													this.state.certificate
														.certificate.unitTitle
												}
												onChange={
													this.handleTitleChange
												}
												required
											/>
											<Form.Control.Feedback>
												Looks good!
											</Form.Control.Feedback>
										</Form.Row>
									</Form.Group>
									<Form.Group className="col-lg-4 col-md-4 ml-auto  m-0 pb-0 pl-0 ">
										<Form.Row className="row m-0 pb-0">
											<Form.Label>
												<p className="mb-1 small ">
													Unit ID:
												</p>
											</Form.Label>
										</Form.Row>
										<Form.Row className="row m-0 pb-0">
											<Form.Control
												maxLength={40}
												onFocus={() =>
													this.props.setName(
														'Unit ID represents the ID of course from your system - e.g. M101 as ID for course Math 101.'
													)
												}
												onBlur={() =>
													this.props.setName('')
												}
												type="text"
												id="unit-id"
												name="template"
												value={
													this.state.certificate
														.certificate.unitId
												}
												onChange={
													this.handleUnitIDChange
												}
												required
											/>
											<Form.Control.Feedback>
												Looks good!
											</Form.Control.Feedback>
										</Form.Row>
									</Form.Group>
								</Form.Row>
								{/*achievment*/}
								<Form.Row className="row m-0 pb-0 mb-4">
									<Form.Group className="col-lg-12 col-md-12 m-0 pb-0 pl-0 ">
										<Form.Row className="row m-0 pb-0 small ">
											<Form.Label>
												<p className="mb-1">
													Achievement:
												</p>
											</Form.Label>
										</Form.Row>
										<Form.Row className="row m-0 pb-0">
											<Form.Control
												maxLength={40}
												onFocus={() =>
													this.props.setName(
														'Achievement - What was the recipient’s engagement in the unit - e.g. participation, completion, competition winner, etc.'
													)
												}
												onBlur={() =>
													this.props.setName('')
												}
												type="text"
												id="achievement"
												name="template"
												value={
													this.state.certificate
														.certificate
														.certificateTitle
												}
												onChange={
													this.handleAchievementChange
												}
												required
											/>
											<Form.Control.Feedback>
												Looks good!
											</Form.Control.Feedback>
										</Form.Row>
									</Form.Group>
								</Form.Row>
								{/*Certificate short description*/}
								<Form.Row className="row m-0 pb-0 mb-4">
									<Form.Group className="col-lg-12 col-md-12 m-0 pb-0 pl-0 ">
										<Form.Row className="row m-0 pb-0">
											<Form.Label>
												<p className="mb-1 small ">
													Certificate short
													description:
												</p>
											</Form.Label>
										</Form.Row>
										<Form.Row className="row m-0 pb-0">
											<textarea
												className="form-control"
												maxLength={400}
												onFocus={() =>
													this.props.setName(
														'Short description - This description serves as additional information to certificate and will be seen when verifying certificate and in the pdf file of the certificate.'
													)
												}
												onBlur={() =>
													this.props.setName('')
												}
												id="description"
												name="template"
												value={
													this.state.certificate
														.certificate
														.shortDescription
												}
												onChange={
													this
														.handleShortDescriptionChange
												}
												required
											/>
											<Form.Control.Feedback>
												Looks good!
											</Form.Control.Feedback>
										</Form.Row>
									</Form.Group>
								</Form.Row>
								{/*type + value + unit*/}
								<Form.Row
									className="row m-0 pb-0 mb-4"
									id="threeinrow"
								>
									<Form.Group className="col-lg-3 col-lg-4 col-md-6 m-0 pb-0 pl-0 ">
										<Form.Row className="row m-0 pb-0">
											<Form.Label>
												<p className="mb-1 small ">
													Certificate type:
												</p>
											</Form.Label>
										</Form.Row>
										<Form.Row className="row m-0 pb-0">
											<Form.Control
												maxLength={40}
												onFocus={() =>
													this.props.setName(
														'Certificate type - E.g. lecture, diploma, certificate.'
													)
												}
												onBlur={() =>
													this.props.setName('')
												}
												type="text"
												id="type"
												name="template"
												value={
													this.state.certificate
														.certificate.type
												}
												onChange={
													this.handleCertTypeChange
												}
												required
											/>
											<Form.Control.Feedback>
												Looks good!
											</Form.Control.Feedback>
										</Form.Row>
									</Form.Group>
									<Form.Group className="col-xl-3 col-lg-4 col-md-6 ml-auto mr-auto m-0 pb-0 pl-0 ">
										<Form.Row className="row m-0 pb-0">
											<Form.Label>
												<p className="mb-1 small ">
													Value:
												</p>
											</Form.Label>
										</Form.Row>
										<Form.Row className="row m-0 pb-0">
											<Form.Control
												maxLength={10}
												onFocus={() =>
													this.props.setName(
														'Value - Connected with field Measurement unit., e.g. number of hours, ECTS points received for course, grade, etc.'
													)
												}
												onBlur={() =>
													this.props.setName('')
												}
												type="number"
												id="value"
												name="template"
												value={
													this.state.certificate
														.certificate.value
												}
												onChange={
													this.handleValueChange
												}
												required
											/>
											<Form.Control.Feedback>
												Looks good!
											</Form.Control.Feedback>
										</Form.Row>
									</Form.Group>
									<Form.Group
										className="col-xl-3 col-lg-4 col-md-6 ml-auto  m-0 pb-0 pl-0"
										id="measure-unit"
									>
										<Form.Row className="row m-0 pb-0">
											<Form.Label>
												<p className="mb-1 small ">
													Measurement unit:
												</p>
											</Form.Label>
										</Form.Row>
										<Form.Row className="row m-0 pb-0">
											<Form.Control
												maxLength={20}
												onFocus={() =>
													this.props.setName(
														'Measurement unit - Assigns unit to value entered in the previous field (field value).'
													)
												}
												onBlur={() =>
													this.props.setName('')
												}
												type="text"
												id="unit"
												name="template"
												value={
													this.state.certificate
														.certificate
														.unitMeasurement
												}
												onChange={
													this
														.handleMeasurementUnitChange
												}
												required
											/>
											<Form.Control.Feedback>
												Looks good!
											</Form.Control.Feedback>
										</Form.Row>
									</Form.Group>
								</Form.Row>
								<Form.Row className="row m-0 pb-0 mb-4">
									<Form.Group className="col-lg-12 col-md-12 m-0 pb-0 pl-0 ">
										<Form.Row className="row m-0 pb-0">
											<Form.Label>
												<p className="mb-1 small ">
													Full decription URL:
												</p>
											</Form.Label>
										</Form.Row>
										<Form.Row className="row m-0 pb-0">
											<Form.Control
												onFocus={() =>
													this.props.setName(
														'Full description URL - Add a link to unit description on your website.'
													)
												}
												onBlur={() =>
													this.props.setName('')
												}
												type="text"
												id="title"
												name="fullDescURL"
												value={
													this.state.certificate
														.certificate
														.fullDescriptionURI
												}
												onChange={this.handleURLChange}
												required
											/>
											<Form.Control.Feedback>
												Looks good!
											</Form.Control.Feedback>
										</Form.Row>
									</Form.Group>
								</Form.Row>
								<Form.Row className="row m-0 pb-0  ">
									<Form.Group className="col-lg-12 col-md-12 ml-auto mt-4 m-0 pb-0 pl-0 ">
										<hr />
										<h3 className="mb-3 mt-3 pt-3 mr-2 pr-3">
											Receiver
										</h3>
									</Form.Group>
								</Form.Row>
								<Form.Row className="row m-0 pb-0 mb-4">
									<Form.Group className="col-lg-3 col-md-6 m-0 pb-0 pl-0 mr-4">
										<Form.Row className="row m-0 pb-0">
											<Form.Label>
												<p className="mb-1 small ">
													Recipient EduCTX ID:
												</p>
											</Form.Label>
										</Form.Row>
										<Form.Row className="row m-0 pb-0">
											<Form.Control
												maxLength={8}
												onFocus={() =>
													this.props.setName(
														'Receiver EduCTX ID - The EduCTX ID must be correct and already existent. Users can see their ID on the right side of navigation bar.'
													)
												}
												onBlur={() =>
													this.props.setName('')
												}
												type="text"
												id="edu-ctx-id"
												name="template"
												value={
													this.state.certificate
														.person.eduCTXid
												}
												onChange={
													this.handleRecipientIDChange
												}
												required
											/>
										</Form.Row>
									</Form.Group>
									<div
										className="col-lg-1 col-md-1 col-sm-1"
										style={{
											marginRight: '-3.5rem',
											marginLeft: '-1.7rem',
											marginTop: '1.5rem',
										}}
									>
										<Form.Label
											hidden={
												this.state.validId ||
												this.state.certificate.person
													.eduCTXid.length !== 8
											}
											className="pt-3  small"
										>
											<Spinner
												animation="border"
												variant="success"
												style={{
													maxHeight: '1rem',
													maxWidth: '1rem',
												}}
											/>
										</Form.Label>
										<Form.Label
											hidden={
												!this.state.validId ||
												this.state.certificate.person
													.eduCTXid.length !== 8
											}
											className="pt-2  small"
										>
											<img
												className="img-fluid pt-1 valid"
												style={{ width: '1rem' }}
												src={ValidDot}
												alt=""
											/>
										</Form.Label>
									</div>
									<Form.Group className="col-lg-3 col-md-3 ml-6  pb-0 pl-0 ">
										<Form.Row className="row m-0 pb-0">
											<Form.Label>
												<p className="mb-1 small ">
													Student ID:
												</p>
											</Form.Label>
										</Form.Row>
										<Form.Row className="row m-0 pb-0">
											<Form.Control
												maxLength={40}
												onFocus={() =>
													this.props.setName(
														'Student ID - Input the ID of the recipient or student from your existing system. This serves as an easier identifier and linking of EduCTX with your existing systems.'
													)
												}
												onBlur={() =>
													this.props.setName('')
												}
												type="text"
												id="student-id"
												name="template"
												value={
													this.state.certificate
														.person.id
												}
												onChange={
													this.handleStudentIDChange
												}
												required
											/>
											<Form.Control.Feedback>
												Looks good!
											</Form.Control.Feedback>
										</Form.Row>
									</Form.Group>
								</Form.Row>
								<Form.Row className="row m-0 pb-0 mb-4">
									<Form.Group className="col-lg-3 col-md-6 m-0 pb-0 pl-0 mr-4">
										<Form.Row className="row m-0 pb-0">
											<Form.Label>
												<p className="mb-1 small ">
													First name:
												</p>
											</Form.Label>
										</Form.Row>
										<Form.Row className="row m-0 pb-0">
											<Form.Control
												onFocus={() =>
													this.props.setName(
														'First name - Include first and middle name of the recipient.'
													)
												}
												onBlur={() =>
													this.props.setName('')
												}
												type="text"
												id="name"
												name="template"
												value={
													this.state.certificate
														.person.firstName
												}
												onChange={
													this.handleFirstNameChange
												}
												required
											/>
											<Form.Control.Feedback>
												Looks good!
											</Form.Control.Feedback>
										</Form.Row>
									</Form.Group>
									<Form.Group className="col-lg-3 col-md-3  ml-6 pb-0 pl-0">
										<Form.Row className="row m-0 pb-0">
											<Form.Label>
												<p className="mb-1 small ">
													Last name:
												</p>
											</Form.Label>
										</Form.Row>
										<Form.Row className="row m-0 pb-0">
											<Form.Control
												onFocus={() =>
													this.props.setName(
														'Last name- Enter last name of the recipient.'
													)
												}
												onBlur={() =>
													this.props.setName('')
												}
												type="text"
												id="last-name"
												name="template"
												value={
													this.state.certificate
														.person.lastName
												}
												onChange={
													this.handleLastNameChange
												}
												required
											/>
											<Form.Control.Feedback>
												Looks good!
											</Form.Control.Feedback>
										</Form.Row>
									</Form.Group>
								</Form.Row>

								<Form.Row className="row m-0 pb-0 ">
									<Form.Group className="col-lg-12 col-md-12 ml-auto mr-auto pb-0 pl-0 ">
										<hr />
										<div className="justify-content-center">
											<Button
												variant="primary"
												type="submit"
												disabled={!this.state.validId}
											>
												ISSUE
											</Button>
										</div>
										<IssueModal
											show={this.state.show}
											onClose={this.handleModalClose}
											cert={this.state.certificate}
											issue={this.handleIssue}
										></IssueModal>
									</Form.Group>
								</Form.Row>
							</Form>
						</Row>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state: any): any => ({
	isCa: () => state.contracts.ca.isCa(state.address, { from: state.address }),
	isAuth: () =>
		state.contracts.ca.isAuthorizedAddress(state.address, {
			from: state.address,
		}),
	getAuthCa: () =>
		state.contracts.ca.getAuthorizedAddressCa(state.address, {
			from: state.address,
		}),
	getCaData: () =>
		state.contracts.ca.getCaMetaData(state.address, {
			from: state.address,
		}),
	getCaDataAuth: (ca: string) =>
		state.contracts.ca.getCaMetaData(ca, { from: state.address }),
	issueCert: (id: string, dataHash: string, dataCipher: string) =>
		state.contracts.token.issueCertificate(id, dataHash, dataCipher, {
			from: state.address,
		}),
	issueCertAuth: (id: string, dataHash: string, dataCipher: string) =>
		state.contracts.token.issueCertificateAuthorizedAddress(
			id,
			dataHash,
			dataCipher,
			{ from: state.address }
		),
	getPublicKey: (id: string) =>
		state.contracts.reguser.getUserPubKeyById(id, { from: state.address }),
	getAddress: (id: string) =>
		state.contracts.reguser.getAddressById(id, { from: state.address }),
	eventTransfer: () => state.contracts.token.Transfer(),
	getCaAddress: state.address,
});

const IssueCertForm = connect(mapStateToProps)(IssueCertFormRaw);
export default IssueCertForm;
