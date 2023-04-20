import React, { useState } from 'react';
import './CertValidTable.css';
// import MaterialDatatable from "material-datatable";
import { graphqlQuery } from './graph-ql';
//import { GraphQLClient, gql } from "graphql-request";
import MUIDataTable, { MUIDataTableColumnOptions } from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ValidDot from './../../../img/check-mark.svg';
import InvalidDot from './../../../img/close-cross.svg';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { sizing } from '@material-ui/system';
const ethUtil = require('ethereumjs-util');

interface IProps {
	hashes: any[];
	certs: any[];
	publicKey: any;
	update: any;
	className?: any;
}

class CertValidTable extends React.Component<IProps, any> {
	constructor(props: any) {
		super(props);
		this.verifyAllCertificates = this.verifyAllCertificates.bind(this);
		this.state = { overallResult: {}, data: [] };
	}

	componentWillReceiveProps(newProps: any) {
		this.verifyAllCertificates(
			newProps.hashes,
			newProps.certs,
			newProps.publicKey
		);
	}

	async verifyAllCertificates(hashes: any[], certs: any[], publicKey: any) {
		let dataResults: any[] = [];
		let overallResult = { result: true, data: dataResults };
		let certHash = '';
		let transactionId: string;

		if (certs.length === 0) {
			overallResult.result = false;
		}

		for (const cert of certs) {
			let found = false;
			let checkInfo = { certificate: cert, valid: false };
			let tempCertJSONHash = ethUtil
				.keccak256(JSON.stringify(cert))
				.toString('hex');
			for (const element of hashes) {
				if (element === tempCertJSONHash) {
					certHash = element;
					found = true;
					break;
				}
			}
			if (found === true) {
				checkInfo.valid = true;
			} else {
				overallResult.result = false;
			}
			dataResults.push(checkInfo);
		}

		if (certHash) {
			try {
				const hashValue = await graphqlQuery(certHash);
				transactionId = hashValue.issuedCertificates[0].id;
			} catch (error) {
				console.log(error);
			}
		}

		let newHashResult = ethUtil
			.keccak256(JSON.stringify(overallResult))
			.toString('hex');
		let oldHashResult = ethUtil
			.keccak256(JSON.stringify(this.state.overallResult))
			.toString('hex');

		if (oldHashResult !== newHashResult) {
			let data = [];
			for (const item of overallResult.data) {
				let itemData = {
					valid: item.valid,
					explorer: (
						<img
							onClick={() => {
								window.open(
									`https://bclabum.informatika.uni-mb.si/explorer/tx/${transactionId}`
								);
							}}
							style={{ height: '2rem', cursor: 'pointer' }}
							src={`${window.location.origin}/besu.png`}
						></img>
					),
					title: item.certificate.certificate.unitTitle,
					achievement: item.certificate.certificate.certificateTitle,
					recipient: `${item.certificate.person.firstName} ${item.certificate.person.lastName}`,
					type: item.certificate.certificate.type,
					value: item.certificate.certificate.value,
					unit: item.certificate.certificate.unitMeasurement,
					time: item.certificate.timestamp,
					issuer: item.certificate.ca.fullName,
					description: item.certificate.certificate.shortDescription,
				};
				data.push(itemData);
			}
			this.setState({ overallResult: overallResult, data: data });
			this.props.update(overallResult);
		}
	}

	krogecTrue: any = (
		<img
			className="img-fluid pt-1 valid"
			style={{ width: '0.7rem', marginLeft: '12px' }}
			src={ValidDot}
			alt=""
		/>
	);
	krogecFalse: any = (
		<img
			className="img-fluid pt-1 invalid"
			style={{ width: '0.7rem', marginLeft: '12px' }}
			src={InvalidDot}
			alt=""
		/>
	);

	customValidRender: any = (
		value: any,
		tableMeta: any,
		updateValue: Function
	) => {
		if (value) return this.krogecTrue;
		else return this.krogecFalse;
	};

	noDisplayOption: MUIDataTableColumnOptions = {
		display: 'false',
	};

	columns = [
		{
			label: 'Valid',
			name: 'valid',
			options: {
				customBodyRender: this.customValidRender,
			},
		},
		{
			label: 'Explorer',
			name: 'explorer',
		},
		{
			label: 'Title',
			name: 'title',
		},
		{
			label: 'Achievement',
			name: 'achievement',
		},
		{
			label: 'Recipient',
			name: 'recipient',
		},
		{
			label: 'Type',
			name: 'type',
		},
		{
			label: 'Value',
			name: 'value',
		},
		{
			label: 'Unit',
			name: 'unit',
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
		},
		{
			label: 'Description',
			name: 'description',
			options: this.noDisplayOption,
		},
	];

	data = [
		{
			valid: true,
			title: 'Lorem ipsum',
			achievement: 'Lorem ipsum lorem ipsum lorem ipsum',
			type: 'Lorem ipsum lorem ipsum',
			value: 111111111,
			unit: 'Lorem ipsum',
			time: '21.03.2019',
			issuer: 'FERI',
			description: 'Kljukica',
		},
		{
			valid: true,
			title: 'Lorem ipsum',
			achievement: 'Lorem ipsum lorem ipsum lorem ipsum',
			type: 'Lorem ipsum lorem ipsum',
			value: 2222222222,
			unit: 'Lorem ipsum',
			time: '21.03.2019',
			issuer: 'UM FERI',
			description: 'Kljukica',
		},
		{
			valid: false,
			title: 'Lorem ipsum',
			achievement: 'Lorem ipsum lorem ipsum lorem ipsum',
			type: 'Lorem ipsum lorem ipsum',
			value: 3333333333,
			unit: 'Lorem ipsum',
			time: '21.03.2019',
			issuer: 'UM FERI',
			description: 'Kljukica',
		},
	];

	/*const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");*/

	options: any = {
		download: false,
		filter: false,
		print: false,
		showResponsive: true,
		responsive: 'stacked',
		selectableRows: 'none',
		expandableRows: true,
		expandableRowsOnClick: false,
		renderExpandableRow: (rowData: any, rowMeta: any) => {
			const colSpan = rowData.length + 1;
			return (
				<TableRow>
					<TableCell colSpan={colSpan} id="details">
						{rowData[8]}
					</TableCell>
				</TableRow>
			);
		},
	};

	render() {
		return (
			<div className={this.props.className}>
				<MUIDataTable
					title={''}
					data={this.state.data}
					columns={this.columns}
					options={this.options}
				></MUIDataTable>
			</div>
		);
	}
}

export default CertValidTable;
