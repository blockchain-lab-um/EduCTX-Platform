import React, { useState } from 'react';
import greyCircles from './../../img/grey-circles.svg';
import signUp from './../../img/sign-up.svg';

const SwitchNetwork: React.FC = () => {
	const [disabled, setDisabled] = useState(false);

	const switchToCorrectNetwork = async () => {
		try {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0x7E2' }],
			});
		} catch (error) {
			// Network does not exist in users wallet so we need to add it
			if (error.code === 4902) {
				await window.ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [
						{
							chainId: '0x7E2',
							chainName: 'EduCTX',
							rpcUrls: [
								'https://bclabum.informatika.uni-mb.si/besu/',
							],
							blockExplorerUrls: [
								'https://bclabum.informatika.uni-mb.si/explorer/',
							],
						},
					],
				});

				await switchToCorrectNetwork();
			} else {
				throw error;
			}
		}
		setDisabled(false);
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
						<h5 className="text-center">Change network</h5>
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
										value="Change network"
										id="sign-up-btn"
										onClick={() => {
											setDisabled(true);
											switchToCorrectNetwork();
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
										value="Change network"
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

export default SwitchNetwork;
