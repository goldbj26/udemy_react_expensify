import React from 'react'
import numeral from 'numeral'

export default (props) => {	
	//console.log("ExpensesTotal", props)
	
	const total = props.expenseList
					.map((expense) => expense.amount)
					.reduce( (sum,value)=> sum+value,0);
	const count = props.expenseList.length;
	if (count) {
		return (
			<h2 id="totalExepnse">{count} expenses - {numeral(total).format('$0,0.00')}</h2>
		);
	}
	else {
		return "";
	}
	
					
}
