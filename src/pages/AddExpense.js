import React from 'react';
import ExpenseForm from '../components/ExpenseForm'

const AddExpense = (props) => (
	<div id="AddExpensePage">
		<h2>This is from my ADD expense component</h2>
		<ExpenseForm mode="Add" />
	</div>
);

export default AddExpense;