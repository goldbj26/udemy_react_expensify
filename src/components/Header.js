import React from 'react';
import {NavLink} from 'react-router-dom';
import {myFirebaseLogOut} from '../redux/firebase'

const Header = () => (
	<header>
		<h1>Expensify</h1>
		<ul>
			<li><NavLink to="/dashboard" activeClassName="linkActive" exact={true}>dashboard</NavLink></li>
			<li><NavLink to="/create" activeClassName="linkActive">create</NavLink></li>			
			<li><NavLink to="/help" activeClassName="linkActive" >help</NavLink></li>
			<li><button onClick={myFirebaseLogOut}>Logout</button></li>
		</ul>
	</header>
);

export default Header;