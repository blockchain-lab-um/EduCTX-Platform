//BEFORE USE!!:
// run "npm install"
//
//HOW TO USE:
//import this javascript file (getZippedPdfsWithJsons.js) into .ts file, where you would like to use it.
//
// import * as zipCreator from '../../js/pdf-zip/getZippedPdfsWithJsons';
//
//
// Then use createZip() function when you want to create and download the zipped pdfs.
// Required parameter: Array of certs you want to zip and download
//
// zipCreator.CreateZip(arrayOfCertificates);

import { getContent } from './src/pdfDefinition';

let JSZip = require('jszip');
let pdfMake = require('pdfmake/build/pdfmake.js');
let pdfFonts = require('pdfmake/build/vfs_fonts.js');
let FileSaver = require('file-saver');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const createZip = (certificateArray, getAuthorizedAddressCa) => {
	let zip = new JSZip();
	let stevec = 0;
	certificateArray.forEach((certificate) => {
		getBlob(certificate, getAuthorizedAddressCa).then((blob) => {
			zip.file(
				certificate.person.lastName +
					'_' +
					certificate.certificate.unitTitle +
					'.pdf',
				blob
			);
			var blobCert = new Blob([JSON.stringify(certificate)], {
				type: 'application/json;charset=utf-8',
			});
			zip.file(
				certificate.certificate.unitTitle + '_certificate.json',
				blobCert
			);
			stevec = stevec + 1;
			if (stevec === certificateArray.length) {
				generateZip(zip, certificate.person);
			}
		});
	});
};

function getBlob(certificate, getAuthorizedAddressCa) {
	return new Promise(async (resolve, reject) => {
		let docDefinition = await getContent(
			certificate,
			getAuthorizedAddressCa
		);
		const pdfDocGenerator = pdfMake.createPdf(docDefinition);
		pdfDocGenerator.getBlob((blob) => {
			resolve(blob);
		});
	});
}

function generateZip(zip, person) {
	zip.generateAsync({ type: 'blob' }).then(function (content) {
		FileSaver.saveAs(
			content,
			person.firstName + '_' + person.lastName + '_certificates.zip'
		);
	});
}

export default createZip;
