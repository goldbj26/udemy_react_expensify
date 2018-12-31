import React from 'react';
import ReactDOM from 'react-dom';

/********************************
// Higher Order Component (HOC) - A component (HOC) that renders another component
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state
 *********************************/



//lower component
const SecretInfo = (props) => (
	<div>
		<h1>Here is the secret</h1>
		<h2>{props.secret}</h2>
	</div>
)

//higher order function - can convert lower components to HOC[AUTH]
//note: lowercase bec. this is not a react component. regular js function to convert 1 react Component into another one
const requireAuth = (WrappedComponent) => {
	return (props) => {
		if (props.isAuthenticated)
			return <WrappedComponent {...props} />
		else
			return (
				<p>Please login to view the info</p>
			)
	}
}


// create HOC
const SecretInfoAuth = requireAuth(SecretInfo); //


// use it
ReactDOM.render(<SecretInfoAuth isAuthenticated={false} secret="Y&R" />, document.getElementById('app'));
