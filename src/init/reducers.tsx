import { SET_WEB3, SET_ADDRESS, SET_CONTRACT } from './actions';

const initialState = {
	web3: {},
	address: {},
	contracts: {},
};

const eduCTXredux = (state = initialState, action: any) => {
	switch (action.type) {
		case SET_WEB3:
			return Object.assign({}, state, {
				web3: action.web3,
			});
		case SET_ADDRESS:
			return Object.assign({}, state, {
				address: action.address,
			});
		case SET_CONTRACT:
			let contracts: any = { ...state.contracts };
			contracts[action.name] = action.contract;
			return Object.assign({}, state, {
				contracts: contracts,
			});
		default:
			return state;
	}
};

export default eduCTXredux;
