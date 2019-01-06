import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
	<header>
		<h1>Expensify</h1>
		<ul>
			<li><NavLink to="/" activeClassName="linkActive" exact={true}>dashboard</NavLink></li>
			<li><NavLink to="/create" activeClassName="linkActive">create</NavLink></li>
			
			<li><NavLink to="/help" activeClassName="linkActive" >help</NavLink></li>
		</ul>
	</header>
);

export default Header;