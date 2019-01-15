import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import myStore from './redux/createStore';
import createHistory from 'history/createBrowserHistory';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import EditExpense, {EditExpenseAll} from './pages/EditExpense';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import Login from './pages/Login'

export const history = createHistory();

/*no longer using <BrowserRouter. rather pass in our history manually, so we can use it in app.js*/ 
const AppRouter  = () => (
	<Router history={history}> 
		<div>
			<Header />
			<Switch>
				<PublicRouteOnly path="/" component={Login} exact={true} />
				<PublicRouteOnly path="/index.html" component={Login} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<PrivateRoute path="/create" component={AddExpense} />
				<PrivateRoute path="/edit" component={EditExpenseAll} exact={true} />
				<PrivateRoute path="/edit/:id" component={EditExpense} />
				<Route path="/help" component={Help} />
				<PublicRouteOnly component={NotFound} />
			</Switch>
		</div>
	</Router>
);
export default AppRouter;


const PrivateRoute = (props) => {
	if (myStore.getState().login.uid) {
		return (<Route {...props} />);
	}
	else {
		return (<Redirect to="/" />);
	}
};


const PublicRouteOnly = (props) => {	
	if (myStore.getState().login.uid) {
		return (<Redirect to="/dashboard" />);
	}
	else {
		return (<Route {...props} />);
	}
};