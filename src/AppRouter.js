import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import EditExpense, {EditExpenseAll} from './pages/EditExpense';
import Help from './pages/Help';
import NotFound from './pages/NotFound';

const AppRouter  = () => (
	<BrowserRouter>
		<div>
			<Header />
			<Switch>
				<Route path="/" component={Dashboard} exact={true} />
				<Route path="/index.html" component={Dashboard} />
				<Route path="/create" component={AddExpense} />
				<Route path="/edit" component={EditExpenseAll} exact={true} />
				<Route path="/edit/:id" component={EditExpense} />
				<Route path="/help" component={Help} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</BrowserRouter>
);
export default AppRouter;