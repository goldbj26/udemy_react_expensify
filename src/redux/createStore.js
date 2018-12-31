import {createStore, combineReducers} from 'redux';
import {expensesReducer} from './expenses';
import {filterReducer} from './filters';


/************************************************* */
/* STATE DEFINED - DEMO */
const demoState = {
	expenses: [
		{
			id: '23432',
			description: 'January Rent',
			note: 'final payment',
			amount: 1200,
			recorded_on: 0
		}
	],

	filter: {
		text: 'rent',
		amount: 0,
		sort: 'description', 
		begin_date: undefined,
		end_date: undefined
	}
};


/************************************************* */


/************************************************* */
/* CREATE STORE - passing reducers */
export const store = createStore(
	combineReducers(
		{
			expenses: expensesReducer,
			filter: filterReducer
		}
	),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);