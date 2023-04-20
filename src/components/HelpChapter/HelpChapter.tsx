import React from 'react';
import './HelpChapter.css';
import { Card, CardDeck } from 'react-bootstrap';
import newCertificate from './../../img/new-certificate.svg';
import verifyCertificate from './../../img/verify-certificate.svg';
import exportCertificate from './../../img/export-certificate.svg';
import editProfile from './../../img/edit-profile.svg';
import additionalFunctionalities from './../../img/additional-functionalities.svg';
import users from './../../img/users.svg';
import dataProtection from './../../img/data-prot.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HelpChapterRaw extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = { registered: false, ca: false, loaded: false };
	}

	async updateState(newProps: any) {
		let isCa = await newProps.isCa();
		let isAuth = await newProps.isAuth();
		let studentID = await newProps.getStudentID();
		if (isCa) {
			this.setState({ registered: true, ca: true, loaded: true });
		} else if (isAuth) {
			this.setState({ registered: true, ca: true, loaded: true });
		} else if (studentID > 0) {
			this.setState({ registered: true, ca: false, loaded: true });
		} else {
			this.setState({ registered: false, ca: false, loaded: true });
		}
	}

	componentDidMount() {
		this.updateState(this.props);
	}
	componentWillReceiveProps(newProps: any) {
		this.updateState(newProps);
	}

	render() {
		const regCaView = (
			<div id="help-chapters">
				<div className="col-lg-12 col-xl-12 ">
					<CardDeck className="justify-content-between text-center mb-4">
						<Card>
							<Link to="/help/new-certifcate">
								<Card.Img
									variant="top"
									style={{ width: '30%' }}
									src={newCertificate}
									alt="Issue new certificate"
								/>
								<Card.Body>
									<Card.Title>
										Issue new certificate
									</Card.Title>
									<Card.Text className="hover-light">
										Issue a new certificate, <br />
										mandatory fields and content.
									</Card.Text>
								</Card.Body>
							</Link>
						</Card>

						<Card>
							<Link to="/help/verify-certifcate">
								<Card.Img
									variant="top"
									style={{ width: '27%' }}
									src={verifyCertificate}
									alt="Verify certificate"
								/>
								<Card.Body>
									<Card.Title>Verify certificate</Card.Title>
									<Card.Text>
										Verify certificate, <br />
										multiple certificates within one file
									</Card.Text>
								</Card.Body>
							</Link>
						</Card>

						<Card>
							<Link to="/help/export-certifcate">
								<Card.Img
									variant="top"
									style={{ width: '32%' }}
									src={exportCertificate}
									alt="Export certificates"
								/>
								<Card.Body>
									<Card.Title>Export certificates</Card.Title>
									<Card.Text className="hover-light">
										Export single or multiple certificates
									</Card.Text>
								</Card.Body>
							</Link>
						</Card>
					</CardDeck>
				</div>
				<div className="col-lg-12 col-xl-12 mb-4">
					<CardDeck className="justify-content-between text-center ">
						<Card>
							<Link to="/help/profile">
								<Card.Img
									variant="top"
									style={{
										width: '40%',
										marginTop: '1.5rem',
									}}
									src={editProfile}
									alt="Edit profile"
								/>
								<Card.Body>
									<Card.Title>Edit profile</Card.Title>
									<Card.Text>
										Change information about <br />
										your institution
									</Card.Text>
								</Card.Body>
							</Link>
						</Card>
						<Card>
							<Link to="/help/additional">
								<Card.Img
									variant="top"
									style={{
										width: '48%',
										marginTop: '-0.2rem',
										paddingLeft: '5%',
									}}
									src={additionalFunctionalities}
									alt="Additional functionalities"
								/>
								<Card.Body>
									<Card.Title>
										Additional functionalities
									</Card.Title>
									<Card.Text>
										Explore EduCTX beyond the platform,{' '}
										<br />
										documentation
									</Card.Text>
								</Card.Body>
							</Link>
						</Card>
						<Card>
							<Link to="/help/users-access">
								<Card.Img
									variant="top"
									style={{
										width: '42%',
										marginTop: '0.6rem',
										marginBottom: '-0.4rem',
									}}
									src={users}
									alt="users"
								/>
								<Card.Body>
									<Card.Title>Users and access</Card.Title>
									<Card.Text>
										Adding users, how users sign in, <br />
										switching between accounts
									</Card.Text>
								</Card.Body>
							</Link>
						</Card>
					</CardDeck>
				</div>
				<div
					className="col-lg-4 col-xl-4 col-md-4 col-sm-4"
					style={{ marginLeft: 'auto', marginRight: 'auto' }}
				>
					<CardDeck className="justify-content-between text-center  ">
						<Card>
							<Link to="/help/data">
								<Card.Img
									variant="top"
									style={{ width: '41%' }}
									src={dataProtection}
									alt="Data protection"
								/>
								<Card.Body>
									<Card.Title>Data protection</Card.Title>
									<Card.Text>
										How is data protected, access, <br />
										private keys and GDPR complience
									</Card.Text>
								</Card.Body>
							</Link>
						</Card>
					</CardDeck>
				</div>
			</div>
		);
		const regStudView = (
			<div id="help-chapters">
				<div className="col-lg-12 col-xl-12 ">
					<CardDeck className="justify-content-between text-center mb-4">
						<Card>
							<Link to="/help/verify-certifcate">
								<Card.Img
									variant="top"
									style={{ width: '27%' }}
									src={verifyCertificate}
									alt="Verify certificate"
								/>
								<Card.Body>
									<Card.Title>Verify certificate</Card.Title>
									<Card.Text>
										Verify certificate, <br />
										multiple certificates within one file
									</Card.Text>
								</Card.Body>
							</Link>
						</Card>

						<Card>
							<Link to="/help/export-certifcate">
								<Card.Img
									variant="top"
									style={{ width: '32%' }}
									src={exportCertificate}
									alt="Export certificates"
								/>
								<Card.Body>
									<Card.Title>Export certificates</Card.Title>
									<Card.Text>
										Export single or multiple certificates
									</Card.Text>
								</Card.Body>
							</Link>
						</Card>
						<Card>
							<Link to="/help/additional">
								<Card.Img
									variant="top"
									style={{
										width: '48%',
										marginTop: '-0.2rem',
										paddingLeft: '5%',
									}}
									src={additionalFunctionalities}
									alt="Additional functionalities"
								/>
								<Card.Body>
									<Card.Title>
										Additional functionalities
									</Card.Title>
									<Card.Text>
										Explore EduCTX beyond the platform,{' '}
										<br />
										documentation
									</Card.Text>
								</Card.Body>
							</Link>
						</Card>
					</CardDeck>
				</div>
				<div
					className="col-lg-8 col-xl-8 mb-4"
					style={{ marginLeft: 'auto', marginRight: 'auto' }}
				>
					<CardDeck className="justify-content-between text-center ">
						<Card>
							<Link to="/help/users-access">
								<Card.Img
									variant="top"
									style={{
										width: '42%',
										marginTop: '0.6rem',
										marginBottom: '-0.4rem',
									}}
									src={users}
									alt="users"
								/>
								<Card.Body>
									<Card.Title>Users and access</Card.Title>
									<Card.Text>
										Adding users, how users sign in, <br />
										switching between accounts
									</Card.Text>
								</Card.Body>
							</Link>
						</Card>
						<Card>
							<Link to="/help/data">
								<Card.Img
									variant="top"
									style={{ width: '41%' }}
									src={dataProtection}
									alt="Data protection"
								/>
								<Card.Body>
									<Card.Title>Data protection</Card.Title>
									<Card.Text>
										How is data protected, access, <br />
										private keys and GDPR complience
									</Card.Text>
								</Card.Body>
							</Link>
						</Card>
					</CardDeck>
				</div>
			</div>
		);
		if (this.state.loaded) {
			if (this.state.ca) return regCaView;
			else return regStudView;
		} else return <div></div>;
	}
}

const mapStateToProps = (state: any): any => ({
	isCa: () => state.contracts.ca.isCa(state.address, { from: state.address }),
	isAuth: () =>
		state.contracts.ca.isAuthorizedAddress(state.address, {
			from: state.address,
		}),
	getStudentID: () =>
		state.contracts.reguser.getIDbyAddress(state.address, {
			from: state.address,
		}),
});

const HelpChapter = connect(mapStateToProps)(HelpChapterRaw);

export default HelpChapter;
