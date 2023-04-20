import React from 'react';
import './Topbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import studentIcon from '../../img/student.svg';

class TopbarRaw extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			registered: false,
			usertype: 'Unregistered',
			name: 'Unregistered',
			logo: '',
		};
	}

	async componentDidMount() {
		this.updateState(this.props);
		this.props.eventChangeMetadata().on('data', (event: any) => {
			this.updateState(this.props);
		});
	}

	async componentWillReceiveProps(newProps: any) {
		this.updateState(newProps);
	}

	async updateState(newProps: any) {
		let isCa = await newProps.isCa();
		if (isCa) {
			let caData: any = await newProps.getCaData();
			if (typeof caData !== 'undefined') {
				this.setState({
					registered: true,
					usertype: 'certified institution',
					name: caData[1],
					logo: caData[0],
				});
			}
		} else {
			let isAuth = await newProps.isAuth();
			if (isAuth) {
				let caAddress: string = await newProps.getAuthCa();
				if (typeof caAddress !== 'undefined') {
					let caData: any = await newProps.getCaDataAuth(caAddress);
					if (typeof caData !== 'undefined') {
						this.setState({
							registered: true,
							usertype: 'authorized person',
							name: caData[1],
							logo: caData[0],
						});
					}
				}
			} else {
				let studentID = await newProps.getStudentID();
				if (studentID > 0) {
					this.setState({
						registered: true,
						usertype: 'student',
						name: studentID.toString(),
						logo: studentIcon,
					});
				} else {
					this.setState({
						registered: false,
						usertype: 'Unregistered',
						name: 'Unregistered',
						logo: '',
					});
				}
			}
		}
	}

	render() {
		let regView = (
			<div id="top-bar">
				{/* Topbar */}
				<nav className="navbar navbar-expand navbar-light bg-grey topbar mb-4 static-top border-grey-bottom">
					{/* Sidebar Toggle (Topbar) */}
					<button
						id="sidebarToggleTop"
						className="btn btn-link d-md-none rounded-circle mr-3"
					>
						<FontAwesomeIcon icon={faBars} />
					</button>
					{/* Topbar Navbar */}

					<ul className="navbar-nav ml-auto no-hover">
						{/* Nav Item - User Information */}
						<li className="nav-item dropdown no-arrow no-hover">
							<div className="nav-link dropdown-toggle no-hover">
								<img
									className="img-profile rounded-circle no-hover"
									src={this.state.logo}
									alt="institution logo"
								/>
								{/* shadow */}
								<div className="column pl-2 px-2 my-auto user-info no-hover">
									<div className="row py-0 pb-0 m-0 no-hover">
										<span className=" text-grey font-weight-normal small mb--3">
											{this.state.name}
										</span>
									</div>
									<div className="row py-0 pb-0 m-0 no-hover">
										<span className="text-gray-600 font-weight-lighter small m-0 p-0">
											{this.state.usertype}
										</span>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</nav>
				{/* End of Topbar */}
			</div>
		);
		//registered=false - za registrirane ne prikaže topbara
		let unregView = <div></div>;
		if (!this.state.registered) {
			return unregView;
		} else {
			return regView;
		}
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
	getAuthCa: () =>
		state.contracts.ca.getAuthorizedAddressCa(state.address, {
			from: state.address,
		}),
	getCaData: () =>
		state.contracts.ca.getCaMetaData(state.address, {
			from: state.address,
		}),
	getCaDataAuth: (address: string) =>
		state.contracts.ca.getCaMetaData(address, {
			from: state.address,
		}),
	eventChangeMetadata: () => state.contracts.ca.ChangeCaMeta(),
});

const Topbar = connect(mapStateToProps)(TopbarRaw);

export default Topbar;
