import React from 'react';
import './SignUp.css';
import greyCircles from './../../img/grey-circles-1.svg';
import metamask from './../../img/metamask.png';

const SignUp: React.FC = () => {
	return (
		<div
			className="card p-3 ml-0 border-grey"
			style={{ height: '100%' }}
			id="sign-up-column"
		>
			{/* Card Body */}
			<div className="card-body vertical-center">
				<div>
					<h5 className="text-center">Sign up</h5>
					{/* CONTENT OF FIRST CARD - do not delete!!!!!!!!!!!!!!!!!!! */}
					<p className="font-weight-normal text-center text-midgrey mb-0 py-0 medium">
						Please use{' '}
						<a href="https://metamask.io/">
							<u>Metamask</u>
						</a>{' '}
						for full experience.
					</p>
				</div>
				<div className="margin-bottom-small ">
					<div>
						<img
							className="img-fluid "
							src={metamask}
							alt=""
							id="metamask"
						/>
						<a href="https://metamask.io/">
							<input
								type="button"
								className="btn btn-success mb-2 medium center-btn"
								name="btn"
								defaultValue="GET METAMASK"
								id="get-metamask"
							/>
						</a>
						<a href="/help.html">
							<input
								type="button"
								className="btn btn-white green-border center-btn "
								name="btn"
								defaultValue="USER GUIDE"
								id="guide-btn"
							/>
						</a>
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
	);
};

export default SignUp;
