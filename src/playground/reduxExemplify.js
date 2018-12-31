import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

console.log('reduxExemplify.js');

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
		sort: 'amount', // date or amount
		begin_date: undefined,
		end_date: undefined
	}
};


/************************************************* */
/* REDUCERS = how to handle actions */
const expensesReducer = (state = [], action) => {	
	switch (action.type) {
		case 'ADD_EXPENSE':
			return state.concat(action.expense);
		case 'REMOVE_EXPENSE':			
			return state.filter( (v,i,a)=> v.id !== action.id );
		case 'EDIT_EXPENSE':			
			return state.map( (expense) => {
				if (expense.id === action.expense.id) {
					return {
						...expense,
						...action.expense
					}
				}
				else
					return expense;
			})
		default:
			return state;
	}		
}

const filterReducerDefaultState = {
	text: '',
	sort: 'date',
	begin_date: undefined,
	end_date: undefined
};
const filterReducer = (state = filterReducerDefaultState, action) => {	
	switch (action.type) {			
		case 'SET_FILTER':			
			return {
				...state,
				...action.filter
			}
		default:
			return state;
	}		
}

/************************************************* */
/* CREATE STORE - passing reducers */
const store = createStore(
	combineReducers(
		{
			expenses: expensesReducer,
			filter: filterReducer
		}
	)
);


//console.log(store.getState()); // empty store
/************************************************* */
/* ACTIONS - EXPENSE */
const AddExpense = (e = {}) => {
	return {
		type: 'ADD_EXPENSE',
		expense : {
			id: uuid(),
			description: undefined,
			note: undefined,
			amount: undefined,
			recorded_on: undefined,
			...e // overwrite defaults with anything passed
		},
	}
}

// this is shorter, but no default information. won't generate id
/*
const AddExpense2 = (e) => {
	e.type = 'ADD_EXPENSE';
	return e;	
}*/

const EditExpense = (e) => {
	return {
		type: 'EDIT_EXPENSE',
		expense : e
	};
}

const RemoveExpense = (id) => ({ type: 'REMOVE_EXPENSE', id });


/* ACTIONS - FILTER */
const SetFilter = (f = filterReducerDefaultState) => {
	return {
		type: 'SET_FILTER',
		filter : f
	};
}

const SortBy = (sortText = '') => {
	return SetFilter({sort: sortText});	
}

const SetBeginDate = (begin_date = undefined) => {
	return SetFilter({begin_date: begin_date});	
}

const SetEndDate = (end_date = undefined) => {
	return SetFilter({end_date: end_date});	
}

const SetText = (text = undefined) => {
	return SetFilter({text: text});	
}

/************************************************* */
/* GetVisible*/
const getVisibleExpenses = ({expenses,filter}) => {	
	const {text,sort,begin_date,end_date} = filter;
	
	/* filter */
	const expenses_filtered = expenses.filter( (expense) => {
		const startDateMatch = typeof begin_date !=='number' || expense.recorded_on >= begin_date;
		const endDateMatch = typeof end_date !=='number' || expense.recorded_on <= end_date;
		const textMatch = !text || expense.description.toLowerCase().includes(text.toLowerCase());
		return startDateMatch && endDateMatch && textMatch;
	})
	
	/* sort */
	const expenses_sorted = expenses_filtered.sort( (a,b) => {
		if (filter.sort === 'date') {
			return (a.recorded_on < b.recorded_on) ? 1 : -1; //desc
		}
		if (filter.sort === 'amount') {
			return (a.amount < b.amount) ? 1 : -1;	//desc
		}

	}) 
	return { expenses: expenses_sorted }
}

/************************************************* */
/* RUN ACTIONS*/
/*
const unsubscribe = store.subscribe( () => {
	//console.log(store.getState());
	console.log(getVisibleExpenses(store.getState()));
})
*/
const ex1= { description: 'A', note: '', amount: 1200, recorded_on: 500 };
const ex2= { description: 'B', note: '', amount: 80, recorded_on: 2000 };
const ex3= { description: 'C', note: '', amount: 1600, recorded_on: 2000 };
const ex4= { description: 'D', note: '', amount: 40, recorded_on: 2000 };
/* add */
const exr1 = store.dispatch(AddExpense(ex1));
const exr2 = store.dispatch(AddExpense(ex2));
const exr3 = store.dispatch(AddExpense(ex3));
const exr4 = store.dispatch(AddExpense(ex4));

//store.dispatch(SetBeginDate(500));
//store.dispatch(SetText('coffee'));
store.dispatch(SortBy('amount'));

//console.log(store.getState());
console.log(getVisibleExpenses(store.getState()));

/*
const exEdit = {ex2, id: exr2.expense.id, description: 'BlackCoffee'};
store.dispatch(EditExpense(exEdit));
store.dispatch(RemoveExpense(exr1.expense.id));
store.dispatch(RemoveExpense(exr2.expense.id));
console.log('***********');
store.dispatch(SortBy('def'));
*/

//unsubscribe();

