import React, { ChangeEvent } from 'react';
import './AuthorizedPerson.css';
import { Row, Col, Card } from 'react-bootstrap';
import { connect } from 'react-redux';

interface Props {
	setName?: any;
	addAuthorizedAddress?: any;
	removeAuthorizedAddress?: any;
	getAuthorizedAddressesByCa?: any;
	eventChangeMetadata?: any;
	eventAddAuth?: any;
	eventRemoveAuth?: any;
}

class AuthorizedPersonRaw extends React.Component<Props, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			address: '',
			persons: [],
		};
		this.authorize = this.authorize.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.remove = this.remove.bind(this);
	}

	authorize: any = async () => {
		await this.props.addAuthorizedAddress(this.state.address);
		this.setState({ address: '' });
	};

	handleAddressChange: any = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({ address: e.target.value });
	};

	remove: any = async (address: string) => {
		await this.props.removeAuthorizedAddress(address);
	};

	async updateState(props: any) {
		let tempPersons: any[] = await props.getAuthorizedAddressesByCa;
		let persons: any[] = [];
		if (typeof tempPersons !== 'undefined') {
			// console.log(tempPersons);
			for (const iterator of tempPersons) {
				const key = iterator.toString();
				let element: any = (
					<div key={key}>
						<hr className="pt-1 mt-1 pb-0 mb-0" />
						<div className="row m-0 pb-0  ">
							<div className="col-lg-8 col-md-8 ml-auto m-0 pb-0 pl-0 ">
								<p className="pb-0 mb-0 mt-2">{key} </p>
							</div>
							<div className="col-lg-4 col-md-4 ml-auto m-0 pb-0 pl-0 pt-1 pb-1 ">
								<a href="#!">
									<input
										type="button"
										className="btn btn-light"
										name="btn"
										defaultValue="UNAUTHORIZE"
										id="unauthorize"
										onClick={() => this.remove(key)}
									/>
									{/* style="white-space:normal"*/}
								</a>
							</div>
						</div>
					</div>
				);
				persons.push(element);
			}
		}
		this.setState({ persons: persons });
	}

	componentDidMount() {
		this.updateState(this.props);
		this.props.eventAddAuth().on('data', (event: any) => {
			this.updateState(this.props);
		});
		this.props.eventRemoveAuth().on('data', (event: any) => {
			this.updateState(this.props);
		});
		this.props.eventChangeMetadata().on('data', (event: any) => {
			this.updateState(this.props);
		});
	}

	componentWillReceiveProps(newProps: any) {
		this.updateState(newProps);
	}

	render() {
		return (
			<div className="col-xl-8 col-lg-8 mr-2 pt-2" id="authorize">
				<Card className=" col-xl-12 mt-4 ml-0">
					<Card.Body className="card-body pl-4 pr-4 pt-4 pb-4">
						<Row className=" m-0 pb-0">
							<h3 className="mb-3 mt-1 pt-1 mr-2 pr-3">
								Authorized person
							</h3>
						</Row>
						<Row className="row m-0 pb-0  ">
							<p>Add new authorized person</p>
						</Row>
						<Row className="row m-0 pb-0">
							<form className="needs-validation" noValidate>
								{/*title and unit id*/}
								<Row className="row m-0 pb-0 mb-4">
									<Col className="col-lg-12 col-md-12 ">
										<Row className="m-0 pb-0">
											<p className="mb-1 small ">
												Ethereum address:
											</p>
										</Row>
										<Row className=" m-0 pb-0">
											<input
												onFocus={() =>
													this.props.setName(
														'Address'
													)
												}
												onBlur={() =>
													this.props.setName('')
												}
												type="text"
												id="title"
												value={this.state.address}
												name="template"
												onChange={
													this.handleAddressChange
												}
												style={{ maxWidth: '450px' }}
												required
											/>
										</Row>
									</Col>
								</Row>

								<Row className="row m-0 pb-0 pb-2">
									<Col className="col-lg-12 col-md-12 ml-auto m-0 pb-0 pl-0 ">
										<input
											type="button"
											className="btn btn-success pl-3 btn-center"
											name="btn"
											defaultValue="AUTHORIZE"
											id="authorizeBtn"
											data-toggle="modal"
											data-target="#confirm-submit"
											onClick={this.authorize}
										/>
									</Col>
								</Row>
								<hr />
								<Row className=" row m-0 pb-0 ">
									<p>Authorized persons</p>
								</Row>
								<Row className=" row m-0 pb-0 ">
									<Col className="col-lg-9 col-md-10 m-0 pb-0 pl-0 ">
										<p className="small mb-0">
											Ethereum address
										</p>
									</Col>
									<Col className="col-lg-3 col-md-2 ml-auto m-0 pb-0 pl-0 ">
										<p className="small mb-0" />
									</Col>
								</Row>

								{this.state.persons}
							</form>
						</Row>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state: any): any => ({
	addAuthorizedAddress: (address: string) =>
		state.contracts.ca.addAuthorizedAddress(address, {
			from: state.address,
		}),
	removeAuthorizedAddress: (address: string) =>
		state.contracts.ca.removeAuthorizedAddress(address, {
			from: state.address,
		}),
	getAuthorizedAddressesByCa: state.contracts.ca.getAuthorizedAddressesByCa(
		state.address,
		{
			from: state.address,
		}
	),
	eventChangeMetadata: () => state.contracts.ca.ChangeCaMeta(),
	eventAddAuth: () => state.contracts.ca.AddAuthorizedAddress(),
	eventRemoveAuth: () => state.contracts.ca.RemoveAuthorizedAddress(),
});

const AuthorizedPerson = connect(mapStateToProps)(AuthorizedPersonRaw);

export default AuthorizedPerson;
