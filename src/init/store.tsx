import { createStore, Store } from 'redux';
import reducers from './reducers';
import { setWeb3, setAddress, setContract } from './actions';
import Web3 from 'web3';
import caContract from '../build/contracts/EduCTXca.json';
import tokenContract from '../build/contracts/EduCTXtoken.json';
import registeredUserContract from '../build/contracts/RegisteredUser.json';

const contract = require('@truffle/contract');

declare global {
	interface Window {
		web3: any;
		ethereum: any;
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
	}
}

const initWeb3 = async (store: Store) => {
	const web3 = new Web3('https://bclabum.informatika.uni-mb.si/besu/');

	/*const contractCA = contract(caContract);
    contractCA.setProvider(web3.currentProvider);
    store.dispatch(setContract(contractCA, "ca"));

    const contractToken = contract(tokenContract);
    contractToken.setProvider(web3.currentProvider);
    store.dispatch(setContract(contractToken, "token"));

    const contractRegUser = contract(caContract);
    contractRegUser.setProvider(web3.currentProvider);
    store.dispatch(setContract(contractRegUser, "reguser"));
    store.dispatch(setWeb3(web3));*/

	const contractCA = await contract(caContract);
	await contractCA.setProvider(web3.currentProvider);
	const instanceCA = await contractCA.deployed();
	store.dispatch(setContract(instanceCA, 'ca'));

	const contractToken = contract(tokenContract);
	contractToken.setProvider(web3.currentProvider);
	const instanceToken = await contractToken.deployed();
	store.dispatch(setContract(instanceToken, 'token'));

	const contractRegUser = contract(registeredUserContract);
	contractRegUser.setProvider(web3.currentProvider);
	const instanceRegUser = await contractRegUser.deployed();
	store.dispatch(setContract(instanceRegUser, 'reguser'));

	store.dispatch(setWeb3(web3));

	store.dispatch(setAddress('0x0000000000000000000000000000000000000000'));
};

const handleCorrectNetwork = async (store: any) => {
	const web3 = new Web3(window.ethereum);
	const contractCA = await contract(caContract);
	await contractCA.setProvider(window.ethereum);
	const instanceCA = await contractCA.deployed();
	store.dispatch(setContract(instanceCA, 'ca'));

	const contractToken = contract(tokenContract);
	contractToken.setProvider(web3.currentProvider);
	const instanceToken = await contractToken.deployed();
	store.dispatch(setContract(instanceToken, 'token'));

	const contractRegUser = contract(registeredUserContract);
	contractRegUser.setProvider(web3.currentProvider);
	const instanceRegUser = await contractRegUser.deployed();
	store.dispatch(setContract(instanceRegUser, 'reguser'));

	store.dispatch(setWeb3(web3));
};

const initialize = async () => {
	const store = createStore(reducers);
	// const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	await initWeb3(store);
	if (window.ethereum) {
		window.ethereum.autoRefreshOnNetworkChange = false;

		try {
			const accounts = await window.ethereum.enable();
			store.dispatch(setAddress(accounts[0]));
		} catch {
			// Tu se lahko naredi custom react alert z dvema gumboma. En za refresh in drugi za redirect do EduCTX.org
			// window.alert("To use the platform we need access to your metamask public addesses");
			// console.log("Declined permission!");
			// window.location.reload();
		}
		const network = window.ethereum.networkVersion;
		window.ethereum.on('accountsChanged', function (accounts: any) {
			sessionStorage.clear();
			// Če se uporabnik odjavi iz metamaska, bo accounts[0] undefined in ga lahko redirectamo na eductx.org
			if (!accounts[0]) {
				window.location.replace('https://eductx.org/');
			} else {
				// Uporabnik je le zamenjal account, zato ga ne redirectamo, ampak mu spremenimo activni account
				store.dispatch(setAddress(accounts[0]));
			}
		});

		window.ethereum.on('networkChanged', async function (network: string) {
			sessionStorage.clear();
			if (network !== '2018') {
				window.location.reload();
			} else {
				window.location.reload();
			}
		});

		if (network !== '2018') {
			await initWeb3(store);
		} else {
			await handleCorrectNetwork(store);
		}
	}

	return store;
};

export default initialize;
