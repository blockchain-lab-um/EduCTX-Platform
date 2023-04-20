import React from 'react';
import MyCertificatesTable from '../MyCertificatesTable/MyCertificatesTable';
import LockedCertificates from '../LockedCertificates/LockedCertificates';
import { connect } from 'react-redux';
const ethUtil = require('ethereumjs-util');

interface IProps {
	small?: boolean;
	getBalance?: any;
	getStudentID?: any;
	getStudentPublicKey?: any;
	eventTransfer?: any;
	address?: any;
}

class MyCertificatesRaw extends React.Component<IProps, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			balance: 0,
			id: '',
			pubKey: '',
			decrypted: false,
			privateKey: '',
		};
	}

	componentDidMount() {
		this.updateState(this.props);
	}

	componentWillReceiveProps(newProps: any) {
		this.updateState(newProps);
	}

	async updateState(newProps: any) {
		let _balance = await newProps.getBalance();
		let _id = await newProps.getStudentID();
		let _pubKey = await newProps.getStudentPublicKey(_id.toNumber());
		this.setState({
			balance: _balance.toNumber(),
			id: _id,
			pubKey: _pubKey,
		});
	}

	decrypt: any = async (privateKey: string) => {
		try {
			const pubKey_fromPrivate = await this.getPublicKeyFromPrivate(
				'0x' + privateKey
			);
			if (this.state.pubKey.substr(2) !== pubKey_fromPrivate) {
				sessionStorage.clear();
			} else {
				this.setState({ decrypted: true, privateKey: privateKey });
				sessionStorage.setItem('unlocked', 'yes');
				sessionStorage.setItem('privateKey', privateKey);
			}
		} catch (error) {
			console.log('Invalid private key.'); // toast?
		}
	};

	getPublicKeyFromPrivate: any = (privateKey: string) => {
		return new Promise((resolve, reject) => {
			var pubKey = new Buffer(ethUtil.privateToPublic(privateKey));
			resolve(pubKey.toString('hex'));
		});
	};

	render() {
		const lockedCert = (
			<LockedCertificates
				number={this.state.balance}
				decrypt={(pk: string) => this.decrypt(pk)}
			></LockedCertificates>
		);

		const unlockedCert = (
			<MyCertificatesTable
				small={this.props.small}
				privateKey={this.state.privateKey}
			></MyCertificatesTable>
		);

		if (!this.state.decrypted)
			if (
				sessionStorage.getItem('unlocked') === 'yes' &&
				sessionStorage.getItem('privateKey')
			) {
				let pk: any = sessionStorage.getItem('privateKey');
				this.setState({ decrypted: true, privateKey: pk });
			}

		return (
			<div className="row pl-2 pr-4">
				<div className="col-xl-12 col-lg-12">
					<div className="pl-3 ">
						{this.state.decrypted ? unlockedCert : lockedCert}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any): any => ({
	getBalance: () =>
		state.contracts.token.balanceOf(state.address, { from: state.address }),
	getStudentID: () =>
		state.contracts.reguser.getIDbyAddress(state.address, {
			from: state.address,
		}),
	getStudentPublicKey: (id: Number) =>
		state.contracts.reguser.getUserPubKeyById(id, { from: state.address }),
});

const MyCertificates = connect(mapStateToProps)(MyCertificatesRaw);

export default MyCertificates;
