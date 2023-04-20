import React from 'react';
import './Navbar.css';
import EDUCoin from './../../img/EDU-Coin.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faListUl,
	faNetworkWired,
} from '@fortawesome/free-solid-svg-icons';
import {
	faCheckCircle,
	faQuestionCircle,
	faUser,
	faFile,
} from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import { connect } from 'react-redux';

class NavbarRaw extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			registered: false,
			auth: false,
			ca: false,
			loaded: false,
		};
	}

	async updateState(newProps: any) {
		let isCa = await newProps.isCa();
		let isAuth = await newProps.isAuth();
		let studentID = await newProps.getStudentID();
		if (isCa) {
			this.setState({
				registered: true,
				ca: true,
				auth: false,
				loaded: true,
			});
		} else if (isAuth) {
			this.setState({
				registered: true,
				auth: true,
				ca: false,
				loaded: true,
			});
		} else if (studentID > 0) {
			this.setState({
				registered: true,
				ca: false,
				auth: false,
				loaded: true,
			});
		} else {
			this.setState({
				registered: false,
				ca: false,
				auth: false,
				loaded: true,
			});
		}
	}

	async componentDidMount() {
		this.updateState(this.props);
	}
	async componentWillReceiveProps(newProps: any) {
		this.updateState(newProps);
	}

	render() {
		// view za registriranega: registered=true
		let regView = (
			<div>
				<ul
					className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion border-grey-right"
					id="accordionSidebar"
				>
					{/* Sidebar - Brand */}
					<Link
						to="/"
						className="sidebar-brand d-flex align-items-center justify-content-center border-grey-bottom"
					>
						<div className="sidebar-brand-icon ">
							<img
								src={EDUCoin}
								alt="EduCTX logo"
								style={{ width: '47px', height: '47px' }}
							/>
						</div>
						<div className="sidebar-brand-text mx-3">EduCTX</div>
					</Link>
					{/* Divider */}
					<hr className="sidebar-divider my-0 mb-3" />
					{/* Nav Item - Dashboard */}
					<NavItem to="/" exact>
						<FontAwesomeIcon icon={faHome} className="nav-icon" />
						<span>Home</span>
					</NavItem>

					<p className="nav-info-divider">Student</p>
					<NavItem to="/my-certificates">
						<FontAwesomeIcon icon={faListUl} className="nav-icon" />
						<span>Received certificates</span>
					</NavItem>
					<p className="nav-info-divider">Other</p>

					<NavItem to="/verify">
						<FontAwesomeIcon
							icon={faCheckCircle}
							className="nav-icon"
						/>
						<span>Verify certificates</span>
					</NavItem>
					<NavItem to="/help">
						<FontAwesomeIcon
							icon={faQuestionCircle}
							className="nav-icon"
						/>
						<span>Help</span>
					</NavItem>
					<NavItem to="/network">
						<FontAwesomeIcon
							icon={faNetworkWired}
							className="nav-icon"
						/>
						<span>Network</span>
					</NavItem>

					{/* Divider 
<hr class="sidebar-divider">
<li class="nav-item">
<h6 class="collapse-header ">Institution</h6> </li>*/}
					{/* Heading */}
					<div className="sidebar-heading">Interface</div>
					{/* Divider 
<hr class="sidebar-divider d-none d-md-block">*/}
					{/* Sidebar Toggler (Sidebar) */}
					<div className="text-center d-none d-md-inline">
						<button
							className="rounded-circle border-0"
							id="sidebarToggle"
						/>
					</div>
				</ul>
			</div>
		);

		let caView = (
			<div>
				<ul
					className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion border-grey-right"
					id="accordionSidebar"
				>
					{/* Sidebar - Brand */}
					<Link
						to="/"
						className="sidebar-brand d-flex align-items-center justify-content-center border-grey-bottom"
					>
						<div className="sidebar-brand-icon ">
							<img
								src={EDUCoin}
								alt="EduCTX logo"
								style={{ width: '47px', height: '47px' }}
							/>
						</div>
						<div className="sidebar-brand-text mx-3">EduCTX</div>
					</Link>
					{/* Divider */}
					<hr className="sidebar-divider my-0 mb-3" />
					{/* Nav Item - Dashboard */}
					<NavItem to="/" exact>
						<FontAwesomeIcon icon={faHome} className="nav-icon" />
						<span>Home</span>
					</NavItem>

					<p className="nav-info-divider">Institution</p>
					<NavItem to="/profile">
						<FontAwesomeIcon icon={faUser} className="nav-icon" />
						<span>Profile</span>
					</NavItem>
					<NavItem to="/issue">
						<FontAwesomeIcon icon={faFile} className="nav-icon" />
						<span>Issue certificate</span>
					</NavItem>
					<NavItem to="/my-certificates">
						<FontAwesomeIcon icon={faListUl} className="nav-icon" />
						<span>Received certificates</span>
					</NavItem>
					<p className="nav-info-divider">Other</p>

					<NavItem to="/verify">
						<FontAwesomeIcon
							icon={faCheckCircle}
							className="nav-icon"
						/>
						<span>Verify certificates</span>
					</NavItem>
					<NavItem to="/help">
						<FontAwesomeIcon
							icon={faQuestionCircle}
							className="nav-icon"
						/>
						<span>Help</span>
					</NavItem>
					<NavItem to="/network">
						<FontAwesomeIcon
							icon={faNetworkWired}
							className="nav-icon"
						/>
						<span>Network</span>
					</NavItem>

					{/* Divider 
<hr class="sidebar-divider">
<li class="nav-item">
<h6 class="collapse-header ">Institution</h6> </li>*/}
					{/* Heading */}
					<div className="sidebar-heading">Interface</div>
					{/* Divider 
<hr class="sidebar-divider d-none d-md-block">*/}
					{/* Sidebar Toggler (Sidebar) */}
					<div className="text-center d-none d-md-inline">
						<button
							className="rounded-circle border-0"
							id="sidebarToggle"
						/>
					</div>
				</ul>
			</div>
		);

		let authView = (
			<div>
				<ul
					className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion border-grey-right"
					id="accordionSidebar"
				>
					{/* Sidebar - Brand */}
					<Link
						to="/"
						className="sidebar-brand d-flex align-items-center justify-content-center border-grey-bottom"
					>
						<div className="sidebar-brand-icon ">
							<img
								src={EDUCoin}
								alt="EduCTX logo"
								style={{ width: '47px', height: '47px' }}
							/>
						</div>
						<div className="sidebar-brand-text mx-3">EduCTX</div>
					</Link>
					{/* Divider */}
					<hr className="sidebar-divider my-0 mb-3" />
					{/* Nav Item - Dashboard */}
					<NavItem to="/" exact>
						<FontAwesomeIcon icon={faHome} className="nav-icon" />
						<span>Home</span>
					</NavItem>

					<p className="nav-info-divider">Institution</p>
					<NavItem to="/issue">
						<FontAwesomeIcon icon={faFile} className="nav-icon" />
						<span>Issue certificate</span>
					</NavItem>
					<NavItem to="/my-certificates">
						<FontAwesomeIcon icon={faListUl} className="nav-icon" />
						<span>Received certificates</span>
					</NavItem>
					<p className="nav-info-divider">Other</p>

					<NavItem to="/verify">
						<FontAwesomeIcon
							icon={faCheckCircle}
							className="nav-icon"
						/>
						<span>Verify certificates</span>
					</NavItem>
					<NavItem to="/help">
						<FontAwesomeIcon
							icon={faQuestionCircle}
							className="nav-icon"
						/>
						<span>Help</span>
					</NavItem>
					<NavItem to="/network">
						<FontAwesomeIcon
							icon={faNetworkWired}
							className="nav-icon"
						/>
						<span>Network</span>
					</NavItem>

					{/* Divider 
<hr class="sidebar-divider">
<li class="nav-item">
<h6 class="collapse-header ">Institution</h6> </li>*/}
					{/* Heading */}
					<div className="sidebar-heading">Interface</div>
					{/* Divider 
<hr class="sidebar-divider d-none d-md-block">*/}
					{/* Sidebar Toggler (Sidebar) */}
					<div className="text-center d-none d-md-inline">
						<button
							className="rounded-circle border-0"
							id="sidebarToggle"
						/>
					</div>
				</ul>
			</div>
		);

		// view za neregistriranega: registered=false
		let unregView = <div></div>;

		if (this.state.loaded) {
			if (!this.state.registered) {
				return unregView;
			} else {
				if (this.state.ca) {
					return caView;
				} else if (this.state.auth) {
					return authView;
				} else return regView;
			}
		} else return unregView;
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

const Navbar = connect(mapStateToProps)(NavbarRaw);

export default Navbar;
