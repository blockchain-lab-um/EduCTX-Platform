import React from 'react';
import CertValidTable from '../CertificatesValidation/Table/CertValidTable';
import CertValid from '../CertificatesValidation/CertValid';
import DragDropV2 from '../DragDropV2/DragDropV2';
import { connect } from 'react-redux';
import { Spinner, Button } from 'react-bootstrap';
import { stringFromBase64 } from '../../utils/base64';
import { decrypt, importKey } from '../../utils/crypto';
import { getIPFS } from '../../utils/ipfs';

const jpack = require('jsonpack');

/*class VerificationProps {
  hashes: any[];
  certs: any[];
  update: any;
  className?: any;
}

class VerificationState {
  certs: Array<any>
  address: string
  hashes: Array<any>
  valid: boolean
  loaded: boolean
  showChild: boolean
  empty: boolean
  fileName: string
  listEmpty: boolean
}*/

class VerificationRaw extends React.Component<any, any> {
	// props: VerificationProps
	// state: VerificationState
	constructor(props: any) {
		super(props);
		/*const newProps = new VerificationProps();
    newProps.certs

    const newState = new VerificationState();
    newState.certs = []
    newState.address = ""
    newState.hashes = []
    newState.valid = false
    newState.loaded = false
    newState.showChild = true
    newState.empty = false
    super(newProps, newState);*/
		this.state = {
			certs: [],
			address: '',
			hashes: [],
			valid: false,
			loaded: false,
			showChild: true,
			empty: false,
			publicKey: '',
		};
		//this.state = newState
		this.setName = this.setName.bind(this);
		this.refresh = this.refresh.bind(this);
		//this.verifyCertificateFromUrl = this.verifyCertificateFromUrl.bind(this);
	}

	async updateState(ethAddress, eduCTXid, newProps: any) {
		const balance: any = await newProps.getBalance(ethAddress);
		const publicKey: any = await newProps.getPublicKey(eduCTXid);
		let hashes = [];
		for (let i = 0; i < balance; i++) {
			const token = await newProps.getToken(ethAddress, i);
			const tokenHash = await newProps.getTokenHash(token.toNumber());
			if (typeof tokenHash !== 'undefined') hashes.push(tokenHash);
			else break;
		}
		if (
			hashes.length.toString() === balance.toString() &&
			typeof publicKey !== 'undefined' &&
			publicKey !== null
		) {
			this.setState({
				hashes: hashes,
				publicKey: publicKey.substring(2),
				loaded: true,
			});
		}
	}

	/*async componentWillReceiveProps(newProps: any) {
    this.updateState(newProps);
  }*/

	componentDidMount() {
		this.verifyCertificateFromUrl();
	}

	async verifyCertificateFromUrl() {
		try {
			const urlParams = new URLSearchParams(window.location.search);
			const paramIpfsPath = urlParams.get('ipfs');
			const paramIv = urlParams.get('iv');
			const paramKey = urlParams.get('key');
			if (!paramIpfsPath || !paramIv || !paramKey) return;

			const ipfsPath = decodeURIComponent(paramIpfsPath);
			const iv = Buffer.from(decodeURIComponent(paramIv), 'base64');
			const key = await importKey(
				JSON.parse(stringFromBase64(decodeURIComponent(paramKey)))
			);

			const encryptedData = await getIPFS(ipfsPath);
			const data = JSON.parse(await decrypt(key, encryptedData, iv));

			if (data !== null) {
				const addressEth = data.person.ethAddress;
				const idEduCTX = data.person.eduCTXid;
				this.setState({ certs: [data] });
				this.updateState(addressEth, idEduCTX, this.props);
			} else {
				this.setState({ loaded: true, empty: true });
			}
		} catch (err) {
			console.log(err);
			this.setState({ loaded: false, empty: true });
		}
	}

	unzippedFile(file: any) {
		const certificates = file;
		if (certificates.length !== 0) {
			const address = certificates[0].person.ethAddress;
			const idEduCTX = certificates[0].person.eduCTXid;
			this.setState({ address: address, certs: certificates });
			this.updateState(address, idEduCTX, this.props);
		} else {
			this.setState({ loaded: true, empty: true });
		}
	}

	setName(fileName: string, listEmpty: boolean) {
		this.setState({ fileName: fileName, listEmpty: listEmpty });
	}

	updateTable(data: any) {
		this.setState({ valid: data.result });
	}

	refresh() {
		this.setState({
			certs: [],
			address: '',
			hashes: [],
			valid: false,
			loaded: false,
			empty: false,
			publicKey: '',
		});
		// window.location.reload(false);
		this.setState({ showChild: false });
		setTimeout(() => {
			this.setState({ showChild: true });
		}, 100);
	}

	render() {
		return (
			<div
				className="row pl-1 ml-0 pt-0 pr-1 pb-2 mb-1"
				style={
					!this.state.listEmpty
						? {
								zIndex: 10,
								height: '100%',
								maxHeight: '600px',
								minHeight: '300px',
						  }
						: {
								zIndex: 10,
								height: '100%',
								maxHeight: '600px',
								minHeight: '300px',
						  }
				}
			>
				<div className="col-xl-12 col-lg-12" style={{ height: '100%' }}>
					<div
						className={
							this.state.loaded || this.state.certs.length === 0
								? 'hidden'
								: ''
						}
						style={{ margin: 'auto auto' }}
					>
						<Spinner animation="border" variant="success" />
					</div>
					<div className="" style={{ height: '100%' }}>
						{this.state.showChild ? (
							<DragDropV2
								unzippedFile={(unzipped: any) =>
									this.unzippedFile(unzipped)
								}
								setName={(
									fileName: string,
									listEmpty: boolean
								) => {
									this.setName(fileName, listEmpty);
								}}
							></DragDropV2>
						) : null}
					</div>
					<div
						className={this.state.loaded ? '' : 'hidden'}
						style={{ marginBottom: '1rem' }}
					>
						<Button
							className="btn btn-success"
							onClick={this.refresh}
						>
							VERIFY ANOTHER ZIP
						</Button>
					</div>
					<CertValid
						className={
							!this.state.loaded || this.state.empty
								? 'hidden'
								: ''
						}
						valid={this.state.valid}
					>
						{this.state.valid
							? `All certificates are valid.`
							: `One or more certificates is invalid.`}
					</CertValid>
					<CertValidTable
						className={
							!this.state.loaded || this.state.empty
								? 'hidden'
								: ''
						}
						hashes={this.state.hashes}
						certs={this.state.certs}
						publicKey={this.state.publicKey}
						update={(data: any) => this.updateTable(data)}
					></CertValidTable>
					<div
						className={
							this.state.loaded && this.state.empty
								? ''
								: 'hidden'
						}
					>
						No certificates were found!
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any): any => ({
	getBalance: (address: any) =>
		state.contracts.token.balanceOf(address, {
			from: state.address,
		}),
	getToken: (address: any, index: number) =>
		state.contracts.token.tokenOfOwnerByIndex(address, index, {
			from: state.address,
		}),
	getTokenHash: (id: number) =>
		state.contracts.token.tokenDataHash(id, {
			from: state.address,
		}),
	getPublicKey: (id: Number) =>
		state.contracts.reguser.getUserPubKeyById(id, {
			from: state.address,
		}),
});

const Verification = connect(mapStateToProps)(VerificationRaw);

export default Verification;
