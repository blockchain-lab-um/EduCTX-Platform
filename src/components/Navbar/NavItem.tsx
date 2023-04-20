import React from 'react';
import './Navbar.css';
import { Route, Link } from 'react-router-dom';

const NavItem: React.FC<any> = (props) => {
	return (
		<Route exact={props.exact} path={props.to}>
			{({ match }: any) => (
				<li className={match ? 'active nav-item' : 'nav-item'}>
					<Link to={props.to} className="nav-link">
						{props.children}
					</Link>
				</li>
			)}
		</Route>
	);
};

export default NavItem;
