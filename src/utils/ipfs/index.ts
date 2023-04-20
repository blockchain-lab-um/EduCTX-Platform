import axios from 'axios';
import { create } from 'ipfs-http-client';

const ipfs = create({
	url: 'https://bclabum.informatika.uni-mb.si/ipfs-post/api/v0',
});

// funkcija sprejme VerifiableCredential v obliki JSON objekta in vrne Promise z naslovom na IPFS
export async function pushIPFS(vc) {
	const ipfsAddress = await ipfs.add(vc);
	return ipfsAddress.path;
}

// funkcija prejme naslov VC-ja na IPFS-u in vrne JSON objekt
export async function getIPFS(ipfsAddress) {
	return (
		await axios.get(
			`https://bclabum.informatika.uni-mb.si/ipfs/ipfs/${ipfsAddress}`
		)
	).data;
}
