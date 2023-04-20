import { Store } from 'redux';
import Web3 from 'web3';
import {
	start,
	setWeb3,
	authorizeAndSetWeb3,
	loadContractSpec,
	loadContractInstance,
	addAccount,
} from 'ethvtx/lib/dispatchers';
import { VtxContract } from 'ethvtx/lib/contracts/VtxContract';
import * as caContract from '../build/contracts/EduCTXca.json';
import * as tokenContract from '../build/contracts/EduCTXtoken.json';
import * as registeredUserContract from '../build/contracts/RegisteredUser.json';

declare global {
	interface Window {
		web3: any;
		ethereum: any;
	}
}

export const setupWeb3 = async (store: Store): Promise<void> => {
	/// If provider requires authorization
	if (window.ethereum) {
		window.ethereum.autoRefreshOnNetworkChange = true;
		window.ethereum.on('accountsChanged', function (accounts: any) {
			sessionStorage.clear();
		});
		const web3_getter = async (): Promise<any> => {
			const provider = window.ethereum;
			const web3 = new Web3(provider);

			return web3;
		};

		await authorizeAndSetWeb3(store.dispatch, {
			enable: window.ethereum.enable,
			web3: web3_getter,
		});
		VtxContract.init(store);

		addAccount(
			store.dispatch,
			'0xbA4bc37907e49Ac44760FF0fc51195c5FECCefbf',
			{
				alias: '@testpermanent',
				permanent: true,
			}
		);

		await loadContract(store, caContract, '@cacontract', true);
		await loadContract(store, tokenContract, '@token', true);
		await loadContract(
			store,
			registeredUserContract,
			'@registereduser',
			true
		);

		start(store.dispatch);
	} else {
		/// If provider does not require authorization, and we assume web3 is available
		// const provider = window.web3.currentProvider;

		//// Should do this in store

		//if (Web3.givenProvider) {
		const web3 = new Web3(
			Web3.givenProvider || 'https://bclabum.informatika.uni-mb.si/besu/'
		);

		setWeb3(store.dispatch, web3);
		VtxContract.init(store);

		addAccount(
			store.dispatch,
			'0xbA4bc37907e49Ac44760FF0fc51195c5FECCefbf',
			{
				alias: '@testpermanent',
				permanent: true,
			}
		);
		await loadContract(store, caContract, '@cacontract', true);
		await loadContract(store, tokenContract, '@token', true);
		await loadContract(
			store,
			registeredUserContract,
			'@registereduser',
			true
		);

		//}
		start(store.dispatch);
	}
};

const loadContract = async (
	store: Store,
	contract: any,
	alias: string,
	permanent: boolean
): Promise<void> => {
	loadContractSpec(
		store.dispatch,
		contract.default.contractName,
		contract.default.abi,
		{ bin: contract.default.deployedBytecode, permanent: permanent }
	);
	loadContractInstance(
		store.dispatch,
		contract.default.contractName,
		contract.default.networks['2018'].address,
		{ alias: alias, permanent: permanent, balance: true }
	);
};
