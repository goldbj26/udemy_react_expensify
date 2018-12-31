

/* GetVisible*/
export const getVisibleExpenses = (expenses,filter) => {

	const {text,amount,begin_date,end_date,sort,sort_asc} = filter;
	
	/* filter */
	const expenses_filtered = expenses.filter( (expense) => {		
		const startDateMatch = typeof begin_date.valueOf() !=='number' || expense.recorded_on >= begin_date;
		const endDateMatch = typeof end_date.valueOf() !=='number' || expense.recorded_on <= end_date;
		const textMatch = !text || expense.description.toLowerCase().includes(text.toLowerCase());
		const amountMatch = typeof amount !=='number' || expense.amount >= amount;		
		return startDateMatch && endDateMatch && textMatch && amountMatch;
	})
	


	/* sort */
	const expenses_sorted = expenses_filtered.sort( (a,b) => {
		if (sort === 'date') {
			if (sort_asc)
				return (a.recorded_on > b.recorded_on) ? 1 : -1; //asc
			else
				return (a.recorded_on < b.recorded_on) ? 1 : -1; //desc
		}
		else if (sort === 'amount') {
			if (sort_asc)
				return (a.amount > b.amount) ? 1 : -1;	//asc
			else
				return (a.amount < b.amount) ? 1 : -1;	//desc
		}
		if (sort === 'description') {
			if (sort_asc)
				return (a.description > b.description) ? 1 : -1; //asc
			else
				return (a.description < b.description) ? 1 : -1; //desc
		}
		if (sort === 'recorded_on') {
			if (sort_asc)
				return (a.recorded_on > b.recorded_on) ? 1 : -1; //asc
			else
				return (a.recorded_on < b.recorded_on) ? 1 : -1; //desc
		}
		else
			return 0;
		
	}) 
	return { expenses: expenses_sorted, filter: filter }
}
