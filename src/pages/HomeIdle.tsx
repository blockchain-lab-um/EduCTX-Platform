import React from 'react';
import { Row, Card } from 'react-bootstrap';
import SignUp from '../components/SignUp/SignUp';
import SidebarBig from '../components/SidebarBig/SidebarBig';
import HomeBackground from '../components/HomeBackground/HomeBackground';
import EduCTXIntro from '../components/EduCTXIntro/EduCTXIntro';
import logo from './../img/EDU-Coin.png';
import Verification from '../components/CertificatesValidation/Verification';

/*
    view za neregistriranega: registered=false, ca=false --> unregView
    view za registriranega študenta: registered=true, ca=false --> regStudView
    view za registriranega CI ali CA: registered=true, ca=true --> regCaView

*/

class HomeIdle extends React.Component<any, any> {
	render() {
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
									<Card className="pl-4 pr-3 pb-0 pt-4">
										<h5 className="text-center mt-2 pb-2">
											Quick certificate verification
										</h5>
										<Verification></Verification>
									</Card>
								</div>
								<SignUp></SignUp>
							</Row>
						</div>
					</div>
				</Row>
			</div>
		);
		return unregView;
	}
}
export default HomeIdle;
