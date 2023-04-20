//BEFORE USE!!:
// run "npm install"

//HOW TO USE:
//import this javascript file (getPdfWithJson.js) into .ts file, where you would like to use it.
//
// import * as pdfCreator from '../../js/pdf-zip/getPdfWithJson';
//
//
// Then use createPdf() function when you want to create and download pdf and json of passed certificate into function.
// Required parameter: cert you want to download pdf and json for
//
// pdfCreator.createPdf(certificate);

import { getContent } from './src/pdfDefinition';

const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const getJson = require('./src/getJson.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const createPdf = async (certificate) => {
	const docDefinition = await getContent(certificate);
	pdfMake
		.createPdf(docDefinition)
		.download(
			certificate.person.firstName +
				'_' +
				certificate.person.lastName +
				'_' +
				certificate.certificate.unitTitle
		);
	getJson.createJson(certificate);
};

module.exports = {
	createPdf,
};
