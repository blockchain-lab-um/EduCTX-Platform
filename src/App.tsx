import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Topbar from './components/Topbar/Topbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Help from './pages/Help/Help';
import MyCertificates from './pages/MyCertificates';
import NetworkPage from './pages/Network';
import VerifyCertificates from './pages/VerifyCertificates';
import HelpAdditional from './pages/Help/HelpAdditional';
import Issue from './pages/Issue';
import Profile from './pages/Profile';
import HelpNewCertificate from './pages/Help/HelpNewCertificate';
import HelpVerify from './pages/Help/HelpVerify';
import HelpExport from './pages/Help/HelpExport';
import HelpProfile from './pages/Help/HelpProfile';
import HelpUsers from './pages/Help/HelpUsers';
import HelpData from './pages/Help/HelpData';
import { connect } from 'react-redux';
import HomeIdle from './pages/HomeIdle';
import Card404 from './components/Card404/Card404';

class AppRaw extends React.Component<any, any> {
	render() {
		if (!window.ethereum) {
			return (
				<Router>
					<div id="wrapper">
						<div
							id="content-wrapper"
							className="d-flex flex-column"
						>
							<div id="content">
								<div className="container-fluid">
									<Switch>
										<Route
											path="/"
											exact
											component={HomeIdle}
										/>
										<Route
											path="/help"
											exact
											component={Help}
										/>
										<Route
											path="/network"
											component={NetworkPage}
										/>
										<Route
											path="/verify"
											component={VerifyCertificates}
										/>
										<Route
											path="/help/additional"
											component={HelpAdditional}
										/>
										<Route
											path="/help/verify-certifcate"
											component={HelpVerify}
										/>
										<Route
											path="/help/data"
											component={HelpData}
										/>
										<Route component={Card404} />
									</Switch>
								</div>
							</div>
						</div>
					</div>
				</Router>
			);
		} else if (window.ethereum.networkVersion !== '2018') {
			return (
				<Router>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/help" exact component={Help} />
						<Route path="/network" component={NetworkPage} />
						<Route path="/verify" component={VerifyCertificates} />
						<Route
							path="/help/additional"
							component={HelpAdditional}
						/>
						<Route
							path="/help/verify-certifcate"
							component={HelpVerify}
						/>
						<Route path="/help/data" component={HelpData} />
						<Route component={Card404} />
					</Switch>
				</Router>
			);
		} else {
			return (
				<Router>
					<div id="wrapper">
						<Navbar />
						<div
							id="content-wrapper"
							className="d-flex flex-column"
						>
							<div id="content">
								<Topbar />
								<div className="container-fluid">
									<Switch>
										<Route
											path="/"
											exact
											component={Home}
										/>
										<Route
											path="/help"
											exact
											component={Help}
										/>
										<Route
											path="/my-certificates"
											component={MyCertificates}
										/>
										<Route
											path="/network"
											component={NetworkPage}
										/>
										<Route
											path="/verify"
											component={VerifyCertificates}
										/>
										<Route
											path="/help/additional"
											component={HelpAdditional}
										/>
										<Route
											path="/help/new-certifcate"
											component={HelpNewCertificate}
										/>
										<Route
											path="/help/verify-certifcate"
											component={HelpVerify}
										/>
										<Route
											path="/help/export-certifcate"
											component={HelpExport}
										/>
										<Route
											path="/help/profile"
											component={HelpProfile}
										/>
										<Route
											path="/help/users-access"
											component={HelpUsers}
										/>
										<Route
											path="/help/data"
											component={HelpData}
										/>
										<Route
											path="/issue"
											component={Issue}
										/>
										<Route
											path="/profile"
											component={Profile}
										/>
										<Route component={Card404} />
									</Switch>
								</div>
							</div>
						</div>
					</div>
				</Router>
			);
		}
	}
}

const mapStateToProps = (state: any) => {
	return {
		web3: state.web3,
		address: state.address,
	};
};

const App = connect(mapStateToProps)(AppRaw);

export default App;
