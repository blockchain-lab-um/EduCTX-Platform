export const SET_WEB3 = 'SET_WEB3';
export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_CONTRACT = 'SET_CONTRACT';

export const setWeb3 = (web3: any) => {
	return {
		type: SET_WEB3,
		web3,
	};
};

export const setAddress = (address: string) => {
	return {
		type: SET_ADDRESS,
		address,
	};
};

export const setContract = (contract: any, name: string) => {
	return {
		type: SET_CONTRACT,
		name,
		contract,
	};
};
