import { stringToBase64 } from '../../utils/base64';
import { encrypt, exportKey, generateKey } from '../../utils/crypto';
import { pushIPFS } from '../../utils/ipfs';

export const createShareableURL = async (
	jsonData,
	client,
	linkedin = false
) => {
	console.log(jsonData);
	const data = JSON.stringify(jsonData);

	// Generate new key for encryption
	const key = await generateKey();

	// Convert it to base64
	const keyBase64 = stringToBase64(JSON.stringify(await exportKey(key)));

	// Create initialization vector for encryption
	const iv = window.crypto.getRandomValues(new Uint8Array(16));

	// Convert it to base64
	const ivBase64 = Buffer.from(iv).toString('base64');

	// Encrypt data
	const encryptedData = await encrypt(key, data, iv);

	// Push it to IPFS
	const ipfsPath = await pushIPFS(encryptedData);

	if (linkedin) {
		if (client === undefined || client === null) {
			// Create final URL
			return `https://platform.eductx.org/verify/${encodeURIComponent(
				`?ipfs=${encodeURIComponent(ipfsPath)}&iv=${encodeURIComponent(
					ivBase64
				)}&key=${encodeURIComponent(keyBase64)}`
			)}`;
		}

		// Create final URL specific for each client
		return `https://platform.eductx.org/verify/${client}/${encodeURIComponent(
			`?ipfs=${encodeURIComponent(ipfsPath)}&iv=${encodeURIComponent(
				ivBase64
			)}&key=${encodeURIComponent(keyBase64)}`
		)}`;
	}

	if (client === undefined || client === null) {
		// Create final URL
		return `https://platform.eductx.org/verify/?ipfs=${encodeURIComponent(
			ipfsPath
		)}&iv=${encodeURIComponent(ivBase64)}&key=${encodeURIComponent(
			keyBase64
		)}`;
	}
	// Create final URL specific for each client
	return `https://platform.eductx.org/verify/${client}/?ipfs=${encodeURIComponent(
		ipfsPath
	)}&iv=${encodeURIComponent(ivBase64)}&key=${encodeURIComponent(keyBase64)}`;
};
