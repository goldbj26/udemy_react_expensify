import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './AppRouter';
import {Provider} from 'react-redux';
import moment from 'moment';
import 'normalize.css/normalize.css'
import './styles/styles.scss'

import {store} from './redux/createStore';
import {AddExpense} from './redux/expenses';
import {SortBy,SetBeginDate,SetText} from './redux/filters';
import {getVisibleExpenses} from './redux/views'

console.log("app.js is running")



const ex1= { description: 'A_Water', note: 'AAA', amount: 1200, recorded_on: moment(new Date(2011, (9-1), 16)).valueOf() };
const ex2= { description: 'B_Gas', note: 'BBB', amount: 80, recorded_on: moment(new Date(2018, (11-1), 16)).valueOf()  };
const ex3= { description: 'Coffee', note: 'CCC', amount: 1600, recorded_on: moment(new Date(2018, (2-1), 2)).valueOf()  };
const ex4= { description: 'Donutes', note: 'DDD', amount: 40, recorded_on: moment(new Date(2017, (5-1), 26)).valueOf()  };
const exr1 = store.dispatch(AddExpense(ex1));
const exr2 = store.dispatch(AddExpense(ex2));
const exr3 = store.dispatch(AddExpense(ex3));
const exr4 = store.dispatch(AddExpense(ex4));
//store.dispatch(SetBeginDate(1000));
//store.dispatch(SetText('C'));
//store.dispatch(SortBy('amount'));
//console.log(getVisibleExpenses(store.getState()));  
console.log(store.getState().expenses);


const app = document.getElementById('app');
const jsx = (
	<Provider store={store}>
		<AppRouter />	
	</Provider>
)
	

ReactDOM.render(jsx,app);
