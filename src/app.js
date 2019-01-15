import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import {Provider} from 'react-redux';
import myStore from './redux/createStore';

import 'normalize.css/normalize.css'
import './styles/styles.scss'



console.log("app.js is running")




/*
import moment from 'moment';

const ex1= { description: 'A_Water', note: 'AAA', amount: 1200, recorded_on: moment(new Date(2011, (9-1), 16)).valueOf() };
const ex2= { description: 'B_Gas', note: 'BBB', amount: 80, recorded_on: moment(new Date(2018, (11-1), 16)).valueOf()  };
const ex3= { description: 'Coffee', note: 'CCC', amount: 1600, recorded_on: moment(new Date(2018, (2-1), 2)).valueOf()  };
const ex4= { description: 'Donutes', note: 'DDD', amount: 40, recorded_on: moment(new Date(2017, (5-1), 26)).valueOf()  };
const exr1 = myStore.dispatch(AddExpense(ex1));
const exr2 = myStore.dispatch(AddExpense(ex2));
const exr3 = myStore.dispatch(AddExpense(ex3));
const exr4 = myStore.dispatch(AddExpense(ex4));
//myStore.dispatch(SetBeginDate(1000));
//myStore.dispatch(SetText('C'));
//myStore.dispatch(SortBy('amount'));
//console.log(getVisibleExpenses(myStore.getState()));  
console.log(myStore.getState().expenses);
*/


/* A] Render Loading...  */
const app = document.getElementById('app');
//ReactDOM.render(<h1>Loading...</h1>,app);

// B] JSX - render application
const jsx = (
	<Provider store={myStore}>
		<AppRouter />	
	</Provider>
)
ReactDOM.render(jsx,app);
