import React from 'react';
import './NumberOfCertificates.css';
import { Col, Card } from 'react-bootstrap';
import certificateBig from './../../img/certificate-big.svg';
import { connect } from 'react-redux';

class NumberOfCertificatesRaw extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = { numberOfCertificates: 0 };
	}

	componentDidMount() {
		this.updateState(this.props);
	}

	componentWillReceiveProps(newProps: any) {
		this.updateState(newProps);
	}

	async updateState(newProps: any) {
		let isCa = await newProps.isCa();
		let isAuth = await newProps.isAuth();
		if (isCa) {
			let number = await newProps.numberOfCertificatesCA();
			if (typeof number !== 'undefined') {
				this.setState({ numberOfCertificates: number.length });
			}
		} else if (isAuth) {
			let number = await newProps.numberOfCertificatesAuth();
			if (typeof number !== 'undefined') {
				this.setState({ numberOfCertificates: number.length });
			}
		}
	}

	render() {
		return (
			<Col className=" col-xl-3 col-lg-4  col-md-12 offset-s-1">
				<Card className="mb-4 card-upper-third" id="number-cert">
					{/* Card Body */}
					<Card.Body
						className="card-body text-center"
						id="cert-number"
					>
						<div className=" my-0">
							<img
								className="img-fluid "
								style={{ width: '4rem' }}
								src={certificateBig}
								alt=""
							/>
						</div>
						<div className="pt-2">
							<h6 className="m-0 text-center big-number ">
								{this.state.numberOfCertificates}
							</h6>
						</div>
						<div>
							<p
								className="font-weight-light text-center text-midgrey "
								id="issued-text"
							>
								issued certificates
							</p>
						</div>
					</Card.Body>
				</Card>
			</Col>
		);
	}
}

const mapStateToProps = (state: any): any => ({
	isCa: () => state.contracts.ca.isCa(state.address, { from: state.address }),
	isAuth: () =>
		state.contracts.ca.isAuthorizedAddress(state.address, {
			from: state.address,
		}),
	numberOfCertificatesCA: () =>
		state.contracts.token.getIssuedTokensByCa(state.address, {
			from: state.address,
		}),
	numberOfCertificatesAuth: () =>
		state.contracts.token.getIssuedTokensByAuthorizedAddress(
			state.address,
			{ from: state.address }
		),
});

const NumberOfCertificates = connect(mapStateToProps)(NumberOfCertificatesRaw);

export default NumberOfCertificates;
