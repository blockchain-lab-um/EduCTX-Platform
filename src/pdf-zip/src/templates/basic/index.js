import { eductxLogo } from '../../images/eductxLogo';
import { PositionCalculator } from '../../positionCalculator';

const axios = require('axios').default;

const getCaLogo = async (certificate) => {
	try {
		const response = await axios.get(certificate.ca.logoURI, {
			responseType: 'arraybuffer',
		});

		const base64 = btoa(
			new Uint8Array(response.data).reduce(
				(data, byte) => data + String.fromCharCode(byte),
				''
			)
		);
		return {
			image: 'data:image/png;base64,' + base64,
			width: 150,
		};
	} catch (error) {
		return {};
	}
};

// EduCTX template
export const basicTemplate = async (
	certificate,
	qrCodeBase64,
	personFullName,
	date
) => {
	const pos = new PositionCalculator('A4', 'landscape');
	const {
		certificate: {
			certificateTitle: achievement,
			shortDescription,
			unitMeasurement: unit,
			unitTitle: title,
			value,
		},
	} = certificate;

	const docDefinition = {
		pageSize: 'A4',
		pageOrientation: 'landscape',
		background: [
			{
				svg: '<svg width="500" height="*"><rect width="100%" height="100%" style="fill:rgb(248,248,248)"/></svg>',
			},
		],
		content: [
			{
				columns: [
					{
						width: 500,
						margin: [
							0,
							12 + pos.calcTopMargin(shortDescription, title),
							0,
							0,
						],
						alignment: 'center',
						stack: [
							await getCaLogo(certificate),
							{
								alignment: 'center',
								margin: [0, 12, 0, 0],
								columns: [
									{
										alignment: 'right',
										margin: [0, 9, 0, 0],
										svg: '<svg height="1" width="10"><line x1="0" y1="0" x2="10" y2="0" stroke="#1A1502" stroke-width="0.8"/></svg>',
									},
									{
										width: 'auto',
										text: achievement,
										margin: [6, 0, 6, 0],
										fontSize: 16,
										fontWeight: 600,
									},
									{
										alignment: 'left',
										margin: [0, 9, 0, 0],
										svg: '<svg height="1" width="10"><line x1="0" y1="0" x2="10" y2="0" stroke="#1A1502" stroke-width="0.8"/></svg>',
									},
								],
							},
							{
								text: title,
								margin: [30, 16, 30, 0],
								fontSize: 40,
								bold: true,
							},
							{
								text: 'ISSUED TO',
								margin: [30, 12, 30, 0],
								fontSize: 14,
								fontWeight: 600,
								color: '#BDBDBD',
							},
							{
								text: personFullName,
								margin: [30, 12, 30, 0],
								fontSize: 24,
								bold: true,
							},
							{
								alignment: 'left',
								svg: '<svg height="1" width="500"><line x1="40" y1="0" x2="460" y2="0" stroke="#1A1502" stroke-width="0.8"/></svg>',
								margin: [0, 9, 0, 0],
							},
							{
								text: shortDescription,
								margin: [30, 12, 30, 0],
								fontSize: 13,
								fontWeight: 400,
								color: '#4F4F4F',
							},
							{
								margin: [0, 24, 0, 0],
								columns: [
									{
										stack: [
											{
												text: 'MEASUREMENT UNIT',
												fontSize: 14,
												bold: true,
												color: '#BDBDBD',
												alignment: 'center',
											},
											{
												text: `${value} ${unit}`,
												fontSize: 14,
												alignment: 'center',
												margin: [0, 2, 0, 0],
											},
										],
									},
									{
										stack: [
											{
												text: 'CERTIFICATE ISSUED',
												fontSize: 14,
												bold: true,
												color: '#BDBDBD',
												alignment: 'center',
											},
											{
												text: date.toLocaleString(),
												fontSize: 14,
												alignment: 'center',
												margin: [0, 2, 0, 0],
											},
										],
									},
								],
							},
						],
					},
					{
						margin: [0, 75, 0, 0],
						stack: [
							{
								text: 'VERIFIED CERTIFICATE',
								margin: [32, 0, 0, 0],
								fontSize: 16,
								color: '#E0E0E0',
							},
							{
								alignment: 'center',
								image: qrCodeBase64,
								width: 300,
								margin: 0,
							},
							{
								text: 'To verify the certificate, please scan this QR code.',
								margin: [32, 0, 0, 0],
								color: '#828282',
							},
							{
								alignment: 'center',
								width: 58,
								height: 58,
								image: eductxLogo,
								margin: [32, 24, 0, 0],
							},
						],
					},
				],
			},
		],

		pageMargins: [0, 30, 0, 30],
	};

	return docDefinition;
};
