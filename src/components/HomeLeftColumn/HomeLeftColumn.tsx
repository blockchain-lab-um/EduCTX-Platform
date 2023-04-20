import React from 'react';
import './HomeLeftColumn.css';
import technology from './../../img/tehcnology.svg';
import blockchainLab from './../../img/blockchain-lab.svg';
import EduCTXCoin from './../../img/EDU-Coin.png';
import { Row, Col, Card } from 'react-bootstrap';

const HomeLeftColumn: React.FC = () => {
	return (
		<div>
			<ul
				className=" navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
				id="accordionSidebar"
			>
				{/* Sidebar - Brand */}
				<a
					className="sidebar-brand d-flex align-items-center justify-content-left border-grey-bottom"
					href="home.html"
				>
					<div className="sidebar-brand-icon ">
						<img
							src={EduCTXCoin}
							alt="EduCTX logo"
							width="47px"
							height="47px"
							id="brand-icon"
						/>
					</div>
					<div className="sidebar-brand-text mx-3">EduCTX</div>
				</a>
				{/* Divider */}
				<hr className="sidebar-divider my-0" />
				{/* Sidebar Toggler (Sidebar) */}
				<div
					className="text-left pt-4 mt-2 d-none d-md-inline"
					id="sidebar-home"
				>
					<div className="sidebar-brand-text heading-big">EduCTX</div>
					<div className="sidebar-brand-text statement">
						Efficient, simplified and safe
						<br />
						solution for student's certificate
						<br /> management and verification.
					</div>
					<a href="https://eductx.org/">
						<input
							type="button"
							className="btn btn-success pl-3"
							name="btn"
							defaultValue="FIND OUT MORE"
							id="find-out-more"
						/>
					</a>
				</div>
			</ul>
			{/*End of sidebar - included logos on left and right bottom screen */}
			<img src={blockchainLab} alt="blockchain-lab" id="blockchain-lab" />
			<img src={technology} alt="technology" id="technology" />
		</div>
	);
};

export default HomeLeftColumn;
