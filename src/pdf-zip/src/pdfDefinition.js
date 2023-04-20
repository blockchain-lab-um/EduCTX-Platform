import { createShareableURL } from '../../utils/share';
import { basicTemplate } from './templates/basic';
import { concordiaTemplate } from './templates/concordia';

const QRCode = require('qrcode');

const getContent = async (certificate, getAuthorizedAddressCa) => {
	const personFullName =
		certificate.person.firstName + ' ' + certificate.person.lastName;
	let date = new Date(0);
	date.setUTCSeconds(certificate.timestamp / 1000);

	let qrCodeBase64 = '';
	try {
		const qrCodeData = await createShareableURL(certificate);
		qrCodeBase64 = await generateQR(qrCodeData);
	} catch (error) {
		console.error(error);
	}

	const fontSizeFullName = getFontSize(personFullName.length);

	let docDefinition;
	//Choose template based on CA authority
	const authorizedAddressCa = await getAuthorizedAddressCa(
		certificate.ca.ethAddress
	);
	if (
		certificate.ca.ethAddress ===
			'0x0d807d08434818325dce69c2ffa8a5d8f8ae6e52' ||
		(authorizedAddressCa &&
			authorizedAddressCa.toLowerCase() ===
				'0x0d807d08434818325dce69c2ffa8a5d8f8ae6e52')
	) {
		docDefinition = await concordiaTemplate(
			certificate,
			qrCodeBase64,
			personFullName,
			date
		);
	} else {
		docDefinition = await basicTemplate(
			certificate,
			qrCodeBase64,
			personFullName,
			date
		);
	}

	return docDefinition;
};

function getFontSize(lengthOfName) {
	let fontsizeFullName = 0;
	if (lengthOfName <= 17) {
		fontsizeFullName = 38;
	} else if (lengthOfName > 17 && lengthOfName <= 20) {
		fontsizeFullName = 32;
	} else if (lengthOfName > 20 && lengthOfName <= 23) {
		fontsizeFullName = 27;
	} else if (lengthOfName > 23 && lengthOfName <= 26) {
		fontsizeFullName = 23;
	} else if (lengthOfName > 26 && lengthOfName <= 29) {
		fontsizeFullName = 20;
	} else if (lengthOfName > 29 && lengthOfName <= 32) {
		fontsizeFullName = 18;
	} else if (lengthOfName > 32 && lengthOfName <= 35) {
		fontsizeFullName = 16;
	} else if (lengthOfName > 35 && lengthOfName <= 38) {
		fontsizeFullName = 15;
	} else if (lengthOfName > 38 && lengthOfName <= 41) {
		fontsizeFullName = 14;
	}
	return fontsizeFullName;
}

async function generateQR(data) {
	try {
		const qrDataUrl = await QRCode.toDataURL(data);
		//const qrBase64 = qrDataUrl.split(',');
		return qrDataUrl;
	} catch (e) {
		console.log('Napaka pri generiranju qr kode');
	}
}

//https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript/20285053#20285053
/*
const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))
*/

export { getContent };
