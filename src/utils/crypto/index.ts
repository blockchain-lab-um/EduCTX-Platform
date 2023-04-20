import { stringToBase64 } from '../base64';

export const generateKey = async () => {
	return await window.crypto.subtle.generateKey(
		{
			name: 'AES-CBC',
			length: 256, //can be  128, 192, or 256
		},
		true, //whether the key is extractable (i.e. can be used in exportKey)
		['encrypt', 'decrypt'] //can be "encrypt", "decrypt", "wrapKey", or "unwrapKey"
	);
};

export const exportKey = async (key: any) => {
	return await window.crypto.subtle.exportKey(
		'jwk', //can be "jwk" or "raw"
		key //extractable must be true
	);
};

export const importKey = async (key: any) => {
	return await window.crypto.subtle.importKey(
		'jwk', //can be "jwk" or "raw"
		key,
		{
			//this is the algorithm options
			name: 'AES-CBC',
			length: 256,
		},
		false, //whether the key is extractable (i.e. can be used in exportKey)
		['encrypt', 'decrypt'] //can be "encrypt", "decrypt", "wrapKey", or "unwrapKey"
	);
};

export const encrypt = async (key: CryptoKey, data: string, iv: Uint8Array) => {
	const encryptedData = await window.crypto.subtle.encrypt(
		{
			name: 'AES-CBC',
			//Don't re-use initialization vectors!
			//Always generate a new iv every time your encrypt!
			iv: iv,
		},
		key, //from generateKey or importKey above
		Buffer.from(new TextEncoder().encode(data)) //ArrayBuffer of data you want to encrypt
	);

	return Buffer.from(encryptedData).toString('base64');
};

export const decrypt = async (key: any, data: string, iv: any) => {
	const decryptedData = await window.crypto.subtle.decrypt(
		{
			name: 'AES-CBC',
			iv: iv, //The initialization vector you used to encrypt
		},
		key, //from generateKey or importKey above
		Buffer.from(data, 'base64') //ArrayBuffer of the data
	);

	return new TextDecoder().decode(decryptedData);
};
