import myStore from './createStore'; // only needed for swapping sort by asc / desc
import moment from 'moment';

/* ACTIONS - FILTER */
export const SetFilter = (f = filterReducerDefaultState) => {
	return {
		type: 'SET_FILTER',
		filter : f
	};
}

export const SortBy = (sortText = '') => {	
	
	const sort = myStore.getState().filter.sort;
	let sort_asc = myStore.getState().filter.sort_asc;

	if (sort === sortText)
		sort_asc = !sort_asc;
	else {
		if (sortText === "description") {sort_asc = true; }			
		if (sortText === "amount") {sort_asc = false;}
		if (sortText === "recorded_on") {sort_asc = false;}
	}

	return SetFilter({sort: sortText, sort_asc: sort_asc});	
}

export const SetBeginDate = (begin_date = undefined) => {
	return SetFilter({begin_date: begin_date});	
}

export const SetEndDate = (end_date = undefined) => {
	return SetFilter({end_date: end_date});	
}

export const SetText = (text = undefined) => {
	return SetFilter({text: text});	
}


export const SetAmount = (amount = 0) => {
	return SetFilter({amount: (parseInt(amount) || 0)});
}


const filterReducerDefaultState = {
	text: '',
	amount: 0,
	sort: 'recorded_on',
	sort_asc: false,
	begin_date: moment().startOf('year'),
	end_date: moment().endOf('month')
};


export const filterReducer = (state = filterReducerDefaultState, action) => {	
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

