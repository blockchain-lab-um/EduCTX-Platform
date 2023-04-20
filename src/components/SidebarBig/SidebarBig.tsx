import React from 'react';
import './SidebarBig.css';
import logo from './../../img/EDU-Coin.png';

const SidebarBig: React.FC = () => {
	return (
		<div id="home">
			<ul
				className=" navbar-nav bg-gradient-primary sidebar sidebar-dark accordion "
				id="accordionSidebar"
			>
				<a
					className="sidebar-brand d-flex align-items-center justify-content-left border-grey-bottom"
					href="/"
				>
					<div className="sidebar-brand-icon ">
						<img
							src={logo}
							alt="EduCTX logo"
							width="47px"
							height="47px"
							id="brand-icon"
						/>
					</div>
					<div className="sidebar-brand-text mx-3">EduCTX</div>
				</a>

				<hr className="sidebar-divider my-0"></hr>
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
					<div id="more-button">
						<a href="https://eductx.org/">
							<input
								type="button"
								className="btn btn-success pl-3"
								name="btn"
								value="FIND OUT MORE"
								id="find-out-more"
							/>
						</a>
					</div>
				</div>
			</ul>
		</div>
	);
};

export default SidebarBig;
