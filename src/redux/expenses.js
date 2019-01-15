//import uuid from 'uuid';
import myFirebase, {fbPath} from './firebase.js';

//***************************************************************************** */
/* ACTIONS - EXPENSE */
/*
export const AddExpense = (e = {}) => {
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
}*/

export const AddExpense = (e) => ({
	type: 'ADD_EXPENSE',
	expense: e
});


export const AddExpenseDB = (e = {}) => {	
	return (dispatch,getState) => {				
		myFirebase.database().ref(fbPath())
			.push(e)
			.then( (ref) => {
				dispatch(AddExpense({id: ref.key,...e}));
			})
	};			
};

// this is shorter, but no default information. won't generate id
/*
const AddExpense2 = (e) => {
	e.type = 'ADD_EXPENSE';
	return e;	
}*/
//***************************************************************************** */
export const EditExpense = (e) => {
	return {
		type: 'EDIT_EXPENSE',
		expense : e
	};
}

export const EditExpenseDB = (e) => {	
	return (dispatch,getState) => {
		myFirebase.database().ref(fbPath(e.id))
			.set(e)
			.then( (ref) => {
				dispatch(EditExpense(e));
			})
	};			
};

//***************************************************************************** */
export const RemoveExpense = (id) => ({ type: 'REMOVE_EXPENSE', id });

export const RemoveExpenseDB = (id) => {
	return (dispatch) => {
		myFirebase.database().ref(fbPath(id))
			.remove()
			.then( (ref) => {
				dispatch(RemoveExpense(id));
			})
	};			
};

/************************************************* */
/* REDUCERS = how to handle actions */

export const expensesReducer = (state = [], action) => {	
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
