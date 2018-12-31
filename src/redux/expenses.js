import uuid from 'uuid';


/* ACTIONS - EXPENSE */
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
}

// this is shorter, but no default information. won't generate id
/*
const AddExpense2 = (e) => {
	e.type = 'ADD_EXPENSE';
	return e;	
}*/

export const EditExpense = (e) => {
	return {
		type: 'EDIT_EXPENSE',
		expense : e
	};
}

export const RemoveExpense = (id) => ({ type: 'REMOVE_EXPENSE', id });



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
