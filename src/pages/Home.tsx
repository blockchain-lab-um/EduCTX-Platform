import React from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import HelpCard from '../components/HelpCard/HelpCard';
import NumberOfCertificates from '../components/NumberOfCertificates/NumberOfCertificates';
import { Row, Card, Spinner } from 'react-bootstrap';
import IssueNewCertificateCard from '../components/IssueNewCertificateCard/IssueNewCertificateCard';
import SidebarBig from '../components/SidebarBig/SidebarBig';
import HomeBackground from '../components/HomeBackground/HomeBackground';
import EduCTXIntro from '../components/EduCTXIntro/EduCTXIntro';
import logo from './../img/EDU-Coin.png';
import { connect } from 'react-redux';
import SignUpTwo from '../components/SignUpTwo/SignUpTwo';
import MyCertificates from '../components/MyCertificates/MyCertificates';
import Verification from '../components/CertificatesValidation/Verification';
import SwitchNetwork from '../components/SwitchNetwork/SwitchNetwork';

/*
    view za neregistriranega: registered=false, ca=false --> unregView
    view za registriranega študenta: registered=true, ca=false --> regStudView
    view za registriranega CI ali CA: registered=true, ca=true --> regCaView

*/

class HomeRaw extends React.Component<any, any> {
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
		// view za neregistriranega: registered=false, ca=false
		let unregView = (
			<div className="greenish">
				<Row className="unreg-home" id="home">
					<HomeBackground></HomeBackground>
					<div className="col-lg-4 col-xl-4 col-md-5 col-sm-12">
						<SidebarBig></SidebarBig>
					</div>

					<div className=" col-lg-8 col-xl-8 col-md-6 ">
						<div id="top-bar">
							<nav className="navbar navbar-expand navbar-light topbar mb-4 static-top border-grey-bottom">
								<a
									className="sidebar-brand d-flex align-items-center justify-content-left small-screens"
									href="/"
								>
									<div className="sidebar-brand-icon ">
										<img
											src={logo}
											alt="EduCTX logo"
											width="47px"
											height="47px"
											id="brand-icon"
										/>
									</div>
									<div className="sidebar-brand-text mx-3">
										EduCTX
									</div>
								</a>
							</nav>
						</div>
						<div className="container-fluid" id="index">
							<Row>
								<EduCTXIntro></EduCTXIntro>
							</Row>
							<Row className="pt-4">
								<div
									className="col-lg-8 col-md-12 col-sm-12 d-flex allign-items-stretch"
									id="quick-verification"
								>
									<Card
										className="pl-4 pr-3 pb-0 pt-4"
										style={{ zIndex: 2 }}
									>
										<h5 className="text-center mt-2 pb-2">
											Quick certificate verification
										</h5>
										<Verification></Verification>
									</Card>
								</div>
								{window.ethereum.networkVersion === '2018' && (
									<SignUpTwo />
								)}
								{window.ethereum.networkVersion !== '2018' && (
									<SwitchNetwork />
								)}
							</Row>
						</div>
					</div>
				</Row>
			</div>
		);

		// view za registriranega študenta: registered=true, ca=false
		let regStudView = (
			<div className="container-fluid" id="index">
				<PageTitle title="Home" />
				<div className="row ml-4 mr-4 pl-1 row-eq-height ">
					{/* <!-- Left column--> */}
					<div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 pr-4">
						<div id="card-drag-drop" className="z-1">
							<Verification></Verification>
						</div>
						<Row className="row pr-3 z-0">
							<HelpCard></HelpCard>
						</Row>
					</div>
					{/* <!-- Right column--> */}
					<div
						className="col-xl-8 col-lg-7 col-md-12 col-sm-12 mb-0 ml-0 pr-2 pb-0 pl-2"
						style={{
							width: '100%',
							height: '100%',
						}}
					>
						{/* <LockedCertificates></LockedCertificates> */}
						<Card id="student-cert">
							{/*                             <MyCertificatesTable></MyCertificatesTable>
							 */}
							<MyCertificates></MyCertificates>
						</Card>
					</div>
				</div>
			</div>
		);

		// view za registriranega CI ali CA: registered=true, ca=true
		let regCaView = (
			<div className="container-fluid " id="index">
				<PageTitle title="Home" />
				<div className="row ml-4 mr-4 pl-1" id="index-ca">
					{/* <!-- Left column--> */}
					<div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 pr-4">
						<div id="card-drag-drop" className="z-1">
							<Verification></Verification>
						</div>
						<Row className="row pr-3 z-0">
							<HelpCard></HelpCard>
						</Row>
					</div>
					{/* <!-- Right column--> */}
					<div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 m-0 pl-1">
						<Row className="pr-2">
							<NumberOfCertificates />
							<IssueNewCertificateCard />
						</Row>
						<Row id="small-cert">
							<Card
								style={{
									width: '100%',
									height: '100%',
								}}
							>
								<MyCertificates small></MyCertificates>
							</Card>
						</Row>
					</div>
				</div>
			</div>
		);

		if (this.state.loaded) {
			// definicija, kaj kje prikazat
			if (!this.state.registered) {
				return unregView;
			} else {
				if (this.state.ca) return regCaView;
				else return regStudView;
			}
		} else
			return (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Spinner animation="border" variant="success" />
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
	getStudentID: () =>
		state.contracts.reguser.getIDbyAddress(state.address, {
			from: state.address,
		}),
});

const Home = connect(mapStateToProps)(HomeRaw);

export default Home;
