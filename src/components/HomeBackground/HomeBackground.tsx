import React from 'react';
import './HomeBackground.css';
import system from './../../img/system.svg';
import hills from './../../img/hills.svg';
import cloud from './../../img/cloud.svg';
import blockchain from './../../img/blockchain-lab.svg';
import { Link } from 'react-router-dom';

const HomeBackground: React.FC = () => {
	return (
		<div style={{ zIndex: 1 }}>
			<div className="row links-footer small">
				<p className="pr-4 text-grey">
					<Link to="/help">Help</Link>
				</p>
				<p className="pr-4 text-grey">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.eductx.org"
					>
						About
					</a>
				</p>
				<p className="pr-4 text-grey">
					<a href={'mailto:blockchain-lab@um.si'}>Contact us</a>
				</p>
			</div>
			<img src={system} alt="system" id="system" />
			<img src={hills} alt="hills" id="hills" />
			<img src={cloud} alt="cloudy" id="cloud" />
			<img src={blockchain} alt="blockchain" id="blockchain-lab" />
		</div>
	);
};

export default HomeBackground;
