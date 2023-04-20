import React, { ChangeEvent } from 'react';
import './InstitutionProfile.css';
import { connect } from 'react-redux';

interface Props {
	setName: any;
	setCaData?: any;
}

class InstProfileRaw extends React.Component<Props, any> {
	caMetadata: any = {};
	constructor(props: any) {
		super(props);
		this.state = { logo: '', name: '', logoChanged: false, address: '' };
		this.handleLogoChange = this.handleLogoChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
	}

	async updateState(newProps: any) {
		let caData = await newProps.getCaData();
		if (
			typeof newProps.getCaData() !== 'undefined' &&
			newProps.getCaData() !== this.caMetadata
		) {
			this.caMetadata = caData;
			let address = await newProps.getAddress;
			this.setState({
				logo: this.caMetadata[0],
				name: this.caMetadata[1],
				address: address,
			});
		}
	}

	async componentDidMount() {
		this.updateState(this.props);
	}

	async componentWillReceiveProps(newProps: any) {
		this.updateState(newProps);
	}

	handleLogoChange(e: ChangeEvent<HTMLInputElement>) {
		this.setState({ logo: e.target.value, logoChanged: true });
	}

	handleNameChange(e: ChangeEvent<HTMLInputElement>) {
		this.setState({ name: e.target.value });
	}

	async saveChanges() {
		await this.props.setCaData(this.state.name, this.state.logo);
	}

	render() {
		return (
			<div className="col-xl-8 col-lg-8" id="institution">
				<div className="card">{this.props.children}</div>
				<div
					className="card col-xl-12 offset-l-1 px-3 mb-4"
					id="cert-issue"
				>
					<div className="card-body p-4">
						<div className="row m-0 pb-0">
							<h3 className="mb-3 mt-1 pt-1 mr-2 pr-3">
								Institution
							</h3>
						</div>
						<div className="col-lg-10 col-md-12 col-sm-12 col-xl-9">
							<div className="row m-0 pb-0">
								<form
									className="needs-validation form-control-no-border"
									noValidate
								>
									{/*title and unit id*/}
									<div className="row m-0 pb-0 mb-4">
										<div className="col-lg-2 col-md-4 col-sm-4  pb-0 pl-0 mb-2">
											<img
												src={this.state.logo}
												alt="Logo"
												className={
													this.state.logoChanged
														? 'profile-image logo-changed'
														: 'profile-image'
												}
											/>
										</div>
										<div className="col-lg-10 col-md-12  col-sm-12  m-0 pb-0 pl-0">
											<div className="row m-0 pb-0">
												<p className="mb-1 small ">
													Logo URI:
												</p>
											</div>
											<div className="row m-0 pb-0 ">
												<input
													onFocus={() =>
														this.props.setName(
															'Logo URI'
														)
													}
													onBlur={() =>
														this.props.setName('')
													}
													type="text"
													id="unit-id"
													name="template"
													onChange={
														this.handleLogoChange
													}
													value={this.state.logo}
													required
												/>
											</div>
										</div>
									</div>
									{/*name*/}
									<div className="row m-0 pb-0 mb-4">
										<div className="col-lg-12 col-md-12 col-sm-12 m-0 pb-0 pl-0 ">
											<div className="row m-0 pb-0 small ">
												<p className="mb-1">Name:</p>
											</div>
											<div className="row m-0 pb-0">
												<input
													onFocus={() =>
														this.props.setName(
															'Name'
														)
													}
													onBlur={() =>
														this.props.setName('')
													}
													type="text"
													id="achievment"
													name="template"
													onChange={
														this.handleNameChange
													}
													value={this.state.name}
													style={{ width: '100%' }}
													required
												/>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="row m-0 pb-0 pt-2">
							<div className="col-lg-12 col-md-12 ml-auto pl-auto m-0 pb-0 ">
								{/* <span class=" font-weight-normal">CONFIRM</span>*/}
								<input
									type="button"
									className="btn btn-primary btn-center"
									name="btn"
									defaultValue="SAVE CHANGES"
									id="save-changes"
									onClick={this.saveChanges}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any): any => ({
	getCaData: () =>
		state.contracts.ca.getCaMetaData(state.address, {
			from: state.address,
		}),
	setCaData: (name: string, logoUri: string) =>
		state.contracts.ca.changeMeta(name, logoUri, {
			from: state.address,
		}),
	getAddress: state.address,
});

const InstitutionProfile = connect(mapStateToProps)(InstProfileRaw);

export default InstitutionProfile;
