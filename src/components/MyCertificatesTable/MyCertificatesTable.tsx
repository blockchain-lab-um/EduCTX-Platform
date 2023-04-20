import React from 'react';
import './MyCertificatesTable.css';
import MUIDataTable from 'mui-datatables';
import Export from '../Export/Export';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { connect } from 'react-redux';
import { createShareableURL } from '../../utils/share';
const jpack = require('jsonpack/main');
const ecies = require('eth-ecies');

interface Props {
	small?: boolean;
	getBalance?: any;
	getToken?: any;
	getTokenUri?: any;
	getTokenHash?: any;
	privateKey: string;
	address?: any;
	eventTransfer?: any;
	getAuthorizedAddressCa?: any;
}

interface Column {
	label: string;
	name: string;
	options: object;
}

interface Certificate {
	title: string;
	achievement: string;
	type: string;
	value: string;
	unit: string;
	time: string;
	issuer: string;
	description: string;
	share: { data: any };
}

interface IState {
	columns: Column[];
	data: Certificate[];
	privateKey: string | any;
	exportableData: any[];
}

class MyCertificatesTableRaw extends React.Component<Props, IState> {
	constructor(props: any) {
		super(props);
		let columns: Column[] = [];
		if (props.small)
			columns = [
				{
					label: 'Title',
					name: 'title',
					options: {},
				},
				{
					label: 'Achievement',
					name: 'achievement',
					options: {},
				},
				{
					label: 'Type',
					name: 'type',
					options: {},
				},
				{
					label: 'Time',
					name: 'time',
					options: {},
				},
				{
					label: 'Issued by',
					name: 'issuer',
					options: {},
				},
				{
					label: 'Share',
					name: 'share',
					options: {
						customBodyRender: (data: { data: any }, meta: any) => {
							return (
								<img
									style={{ height: '21px' }}
									src="LI-In-Bug.png"
									onClick={async () => {
										const link = await createShareableURL(
											data.data,
											await this.getClientFromCA(
												data.data.ca
											),
											true
										);
										window.open(
											`https://www.linkedin.com/sharing/share-offsite/?url=${link}`
										);
									}}
								/>
							);
						},
					},
				},
			];
		else
			columns = [
				{
					label: 'Title',
					name: 'title',
					options: {},
				},
				{
					label: 'Achievement',
					name: 'achievement',
					options: {},
				},
				{
					label: 'Type',
					name: 'type',
					options: {},
				},
				{
					label: 'Value',
					name: 'value',
					options: {},
				},
				{
					label: 'Unit',
					name: 'unit',
					options: {},
				},
				{
					label: 'Time',
					name: 'time',
					options: {
						customBodyRender: (data: any, meta: any) => {
							let date =
								data.length > 10
									? new Date(parseInt(data))
									: new Date(1970, 1, 0, 1, 1);
							let day = date.getDate();
							let month = date.getMonth() + 1;
							let year = date.getFullYear();
							let hour = ('0' + date.getHours()).slice(-2);
							let minutes = ('0' + date.getMinutes()).slice(-2);
							return `${day}.${month}.${year} ${hour}:${minutes}`;
						},
					},
				},
				{
					label: 'Issued by',
					name: 'issuer',
					options: {},
				},
				{
					label: 'Description',
					name: 'description',
					options: {
						display: 'false',
					},
				},
				{
					label: 'Share',
					name: 'share',
					options: {
						customBodyRender: (data: { data: any }, meta: any) => {
							return (
								<img
									style={{ height: '21px' }}
									src="LI-In-Bug.png"
									onClick={async () => {
										const link = await createShareableURL(
											data.data,
											await this.getClientFromCA(
												data.data.ca
											),
											true
										);
										window.open(
											`https://www.linkedin.com/sharing/share-offsite/?url=${link}`
										);
									}}
								/>
							);
						},
					},
				},
			];

		this.state = {
			columns: columns,
			data: [],
			privateKey: this.props.privateKey,
			exportableData: [],
		};
	}

	async getClientFromCA(ca: any) {
		if (
			ca.ethAddress === '0x0d807d08434818325dce69c2ffa8a5d8f8ae6e52' ||
			(
				await this.props.getAuthorizedAddressCa(ca.ethAddress)
			).toLowerCase() === '0x0d807d08434818325dce69c2ffa8a5d8f8ae6e52'
		) {
			return 'concordia';
		}
		return null;
	}

	async updateState(newProps: any) {
		this.setState({ privateKey: newProps.privateKey });
		let balance = await newProps.getBalance();

		if (typeof balance !== 'undefined') {
			let certData: Certificate[] = [];
			let certExportable: any[] = [];
			for (let index = 0; index < balance; index++) {
				let tokenId = await newProps.getToken(index);
				if (typeof tokenId !== 'undefined') {
					let tokenCipher = await newProps.getTokenCipher(
						tokenId.toNumber()
					);
					if (typeof tokenCipher !== 'undefined') {
						let tokenHash = await newProps.getTokenHash(
							tokenId.toNumber()
						);
						if (typeof tokenHash !== 'undefined') {
							let data: any = await this.unlockCertificates(
								tokenCipher,
								tokenId.toNumber(),
								tokenHash
							);
							const currentCertificateData = {
								title: data.certificate.unitTitle,
								achievement: data.certificate.certificateTitle,
								type: data.certificate.type,
								value: data.certificate.value,
								unit: data.certificate.unitMeasurement,
								time: data.timestamp,
								issuer: data.ca.fullName,
								description: data.certificate.shortDescription,
							};
							let certUnlocked: Certificate = {
								...currentCertificateData,
								share: {
									data: data,
								},
							};

							certData.push(certUnlocked);
							certExportable.push(data);
						}
					}
				}
			}
			if (this.state.data.length !== certData.length)
				this.setState({
					data: certData,
					exportableData: certExportable,
				});
		}
	}

	async componentWillReceiveProps(newProps: any) {
		this.updateState(newProps);
	}

	async componentDidMount() {
		this.updateState(this.props);
		this.props.eventTransfer().on('data', (event: any) => {
			if (
				event.returnValues.to.toUpperCase() ===
				this.props.address.toUpperCase()
			) {
				this.updateState(this.props);
			}
		});
	}

	unlockCertificates: any = (
		tokenCipher: string,
		tokenId: number,
		tokenHash: string
	) => {
		return new Promise(async (resolve, reject) => {
			let decrypted = ecies.decrypt(
				Buffer.from(this.state.privateKey, 'hex'),
				Buffer.from(tokenCipher, 'hex')
			);
			const decryptedString: any = Buffer.from(
				decrypted,
				'hex'
			).toString();
			let cert: any = jpack.unpack(decryptedString);
			let newJson = {
				eductxVersion: cert.eductxVersion,
				timestamp: cert.timestamp,
				person: {
					id: cert.person.id,
					firstName: cert.person.firstName,
					lastName: cert.person.lastName,
					ethAddress: cert.person.ethAddress,
					eduCTXid: cert.person.eduCTXid,
				},
				ca: {
					fullName: cert.ca.fullName,
					logoURI: cert.ca.logoURI,
					ethAddress: cert.ca.ethAddress,
				},
				certificate: {
					type: cert.certificate.type,
					certificateTitle: cert.certificate.certificateTitle,
					unitId: cert.certificate.unitId,
					unitTitle: cert.certificate.unitTitle,
					shortDescription: cert.certificate.shortDescription,
					fullDescriptionURI: cert.certificate.fullDescriptionURI,
					value: cert.certificate.value,
					unitMeasurement: cert.certificate.unitMeasurement,
				},
			};
			resolve(newJson);
		});
	};

	customToolbar = (
		selectedRows: any,
		displayData: any,
		setSelectedRows: any
	) => {
		const selectedCertificates = [];
		for (const row of selectedRows.data) {
			let index = row.dataIndex;
			selectedCertificates.push(this.state.exportableData[index]);
		}
		return <Export certs={selectedCertificates}></Export>;
	};

	options: any = {
		download: false,
		filter: false,
		filterType: 'checkbox',
		selectableRows: 'multiple',
		selectableRowsOnClick: true,
		expandableRows: true,
		print: false,
		responsive: 'scrollMaxHeight',
		customToolbarSelect: this.customToolbar,
		// renderExpandableRow: renderExpandable,
		renderExpandableRow: (rowData: any, rowMeta: any) => {
			const colSpan = rowData.length + 1;
			return (
				<TableRow>
					<TableCell colSpan={colSpan} id="details">
						{rowData[7]}
					</TableCell>
				</TableRow>
			);
		},
		textLabels: {
			body: {
				noMatch: 'Sorry, no matching certificates found',
				toolTip: 'Sort',
			},
			pagination: {
				next: 'Next Page',
				previous: 'Previous Page',
				rowsPerPage: 'Certificates per page:',
				displayRows: 'of',
			},
			toolbar: {
				search: 'Search',
				downloadCsv: 'Download CSV',
				print: 'Print',
				viewColumns: 'View Columns',
				filterTable: 'Filter Table',
			},
			filter: {
				all: 'All',
				title: 'FILTERS',
				reset: 'RESET',
			},
			viewColumns: {
				title: 'Show Columns',
				titleAria: 'Show/Hide Table Columns',
			},
			selectedRows: {
				text: 'certificate(s) selected',
				delete: 'Export',
				deleteAria: 'Export Selected Certificates',
			},
		},
	};

	render() {
		return (
			<MUIDataTable
				title={''}
				data={this.state.data}
				columns={this.state.columns}
				options={this.options}
			/>
		);
	}
}

const mapStateToProps = (state: any): any => ({
	getBalance: () =>
		state.contracts.token.balanceOf(state.address, { from: state.address }),
	getToken: (index: number) =>
		state.contracts.token.tokenOfOwnerByIndex(state.address, index, {
			from: state.address,
		}),
	getTokenCipher: (id: number) =>
		state.contracts.token.tokenCipherText(id, { from: state.address }),
	getTokenHash: (id: number) =>
		state.contracts.token.tokenDataHash(id, { from: state.address }),
	eventTransfer: () => state.contracts.token.Transfer(),
	getAuthorizedAddressCa: (address: string) =>
		state.contracts.ca.getAuthorizedAddressCa(address, {
			from: state.address,
		}),
	address: state.address,
});

const MyCertificatesTable = connect(mapStateToProps)(MyCertificatesTableRaw);

export default MyCertificatesTable;
