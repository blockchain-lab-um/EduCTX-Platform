import React, { useState } from 'react';
import './SignUpTwo.css';
import greyCircles from './../../img/grey-circles.svg';
import signUp from './../../img/sign-up.svg';
import { connect } from 'react-redux';
const ethUtil = require('ethereumjs-util');
const sigUtil = require('eth-sig-util');

const SignUpTwoRaw: React.FC = (props: any) => {
	const [disabled, setDisabled] = useState(false);
	const generateID: any = (numOfDigits: number) => {
		return new Promise(async (resolve, reject) => {
			try {
				let id: string = '';
				for (let i = 0; i < numOfDigits; i++) {
					let min = i === 0 ? 1 : 0;
					let max = 9;
					let digit = Math.floor(
						Math.random() * (max - min + 1) + min
					);
					id += digit.toString();
				}
				resolve(id);
			} catch (error) {
				reject(error);
			}
		});
	};

	const signMessage = () => {
		return new Promise((resolve, reject) => {
			const text =
				'This message is being signed with purpose of getting public key.';
			const msg = ethUtil.bufferToHex(new Buffer(text, 'utf8'));
			const from = props.address;
			const params = [msg, from];
			const method = 'personal_sign';
			const web3 = props.web3;
			web3.currentProvider.sendAsync(
				{
					method,
					params,
					from,
				},
				async function (err: any, result: any) {
					if (err) {
						console.error(err);
						reject(err);
					}
					if (result.error) {
						console.error(result.error);
						reject(result.error);
					}
					// V primeru, da je uporabnik potrdil in ni bilo nobenega errorja
					if (!err && !result.error) {
						const msgParams = { data: msg, sig: null };
						msgParams.sig = result.result;
						let pubBuffer = Buffer.from(
							sigUtil.extractPublicKey(msgParams).slice(2),
							'hex'
						); // remove 0x HEX prefix
						let pubKey = pubBuffer.toString('hex');
						resolve(pubKey);
					}
				}
			);
		});
	};

	const registerUser: any = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const publicKey: any = await signMessage();
				const userAddress1PublicKey: string =
					'0x' + publicKey.toString('hex');
				const userId: string = await generateID(8);
				// alert ...
				alert(
					'After you confirm the transaction the signup proccess will be in progress, please wait! When it is finished it will automatically refresh the page.'
				);
				await props.registerUser(userAddress1PublicKey, userId);
				const registeredUserId = await props.getStudentID();
				window.location.reload();
				resolve(registeredUserId);
			} catch (error) {
				setDisabled(false);
				reject(error);
			}
		});
	};

	return (
		<div
			className="col-lg-3 col-md-12  offset-lg-0 col-sm-6 d-flex align-items-stretch"
			id="sign-up-column"
		>
			<div
				className="card p-3 ml-0 border-grey "
				style={{ height: '100%' }}
			>
				{/* Card Body */}
				<div className="card-body vertical-center">
					<div>
						<h5 className="text-center">Sign up</h5>
					</div>
					<div className="margin-bottom-small ">
						<div>
							<img
								className="img-fluid"
								src={signUp}
								alt=""
								id="sign-up"
							/>
							<p className="font-weight-normal text-center text-midgrey mb-4 py-0 medium">
								You are one step away from using our platform.
							</p>

							{
								// Ko gumb ni disabled prikažemo normalni gumb
								!disabled && (
									<input
										type="button"
										className="btn btn-success mb-2 center-btn"
										name="btn"
										value="SIGN UP"
										id="sign-up-btn"
										onClick={() => {
											setDisabled(true);
											registerUser();
										}}
									/>
								)
							}

							{
								// Ko je gumb disabled lahko prikažemo siv gumb (brez onClick) ali pa kaj drugega
								disabled && (
									<input
										type="button"
										className="btn btn-success mb-2 center-btn"
										name="btn"
										value="SIGN UP"
										id="sign-up-btn"
									/>
								)
							}

							<div className="small">
								<p className="font-weight-light text-center text-midgrey mb-4 py-0 small letter-space-1">
									* This will open Metamask.
								</p>
							</div>
						</div>
						<div className="row inline center ">
							<img
								className="img-fluid grey-circle"
								src={greyCircles}
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: any): any => ({
	getStudentID: () =>
		state.contracts.reguser.getIDbyAddress(state.address, {
			from: state.address,
		}),
	address: state.address,
	web3: state.web3,
	registerUser: (publicKey: string, userId: string) =>
		state.contracts.reguser.registerUser(state.address, publicKey, userId, {
			from: state.address,
		}),
});

const SignUpTwo = connect(mapStateToProps)(SignUpTwoRaw);

export default SignUpTwo;
