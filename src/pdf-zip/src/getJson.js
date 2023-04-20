let FileSaver = require('file-saver');

const createJson = (certificate) => {
	var blob = new Blob([JSON.stringify(certificate)], {
		type: 'application/json;charset=utf-8',
	});
	FileSaver.saveAs(blob, 'ethereum_wallet.json');
};

module.exports = {
	createJson,
};
