import {createStore} from 'redux';

console.log('redux101.js');

/* REDUCER = how to handle actions */
// 1. reducers need to be "pure" funtions (what you put in will always give out same thing. e.g. does not acess any global variables)
// 2. never change state or action. just return new object
const countReducer = (state = {count: 0}, action) => {	
	if (action.type === 'INCREMENT')
		return {count: state.count + action.amount}
	if (action.type === 'DECREMENT')
		return {count: state.count - action.amount}
	if (action.type === 'SET')
		return {count: action.amount}
	return state;
}

/* CREATE STORE - passing a reducer */
const countStore = createStore(countReducer);

/************************************************* */
/* ACTIONS */
const increment = (x) => {
	return {
		type: 'INCREMENT',
		amount: x
	};
}

const incrementObj = ({amount=1}= {}) => {  /* if nothing passed will have empty object. if no amount pass, will default to 1. */
	return {
		type: 'INCREMENT',
		amount /* equivalent to amout: amount. but since same name can shorten */
	};
}

const decrement = (x) => {
	return {
		type: 'DECREMENT',
		amount: x
	};
}

const set = (x) => {
	return {
		type: 'SET',
		amount: x
	};
}
const reset = set(0);

/************************************************* */
/* RUN ACTIONS*/
const unsubscribe = countStore.subscribe( () => {
	console.log(countStore.getState());
})

console.log(countStore.getState()); //0
countStore.dispatch(increment(1));
countStore.dispatch(increment(2));
countStore.dispatch(incrementObj({amount: 3}));
countStore.dispatch(incrementObj()); // not passing anything. function defaults to empty object, which then defaults amount to 1.
countStore.dispatch(decrement(2));
countStore.dispatch(set(20));
countStore.dispatch(reset);
unsubscribe();

