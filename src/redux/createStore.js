import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'; // Redux Thunk middleware allows you to write action creators that return a function instead of an action. used for firebase
import {expensesReducer} from './expenses';
import {filterReducer} from './filters';
import {loginReducer} from './auth';

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
	},

	login: {
		uid: 'Fb50EM4djZYmvPOYUqrhHlMnHeG3'
	}
};


/************************************************* */

const compoeseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/************************************************* */
/* CREATE STORE - passing reducers */



const myStore = createStore(
	combineReducers(
		{
			
			expenses: expensesReducer,
			filter: filterReducer,
			login: loginReducer
			
		}
	),
	compoeseEnhancers(applyMiddleware(thunk))
	//applyMiddleware(thunk)
	//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
);
export default myStore