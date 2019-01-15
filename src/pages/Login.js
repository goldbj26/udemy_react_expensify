import React from 'react'
import {connect} from 'react-redux';
import { myFirebaseLogin } from '../redux/firebase'

const Login = (props) => {

	const handleSubmit = () => {	
		
		props.history.push('/dashboard'); 		
	}

	return(

		<React.Fragment key="login">
			<h1>Login</h1>
			<p><button onClick={props.startLogin}>Login</button></p>
			<p><button onClick={handleSubmit}>Dashboard</button></p>
		</React.Fragment>
	)

}

const mapDispathchToProps = (dispatch) => ({
	startLogin: ()=> dispatch(myFirebaseLogin())
})


//export default Login;
export default connect(undefined,mapDispathchToProps)(Login);


