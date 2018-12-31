import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm'

export const EditExpenseAll = () => (
	<h2>This is from my general EDIT expense page</h2>
);

const EditExpense = (props) => {	
	let id = props.match.params.id; // react router gives us this from the path
	return (
		<div>
			<h2>EDIT expense ID = {id}</h2>		
			<ExpenseForm mode="Edit" expense={props.expense} />
		</div>
	);
}
const mapStateToProps = (state, props) => {
	return {
		expense: state.expenses.find( (expense) => expense.id === props.match.params.id) // props.match comes from ract router
	}
}
export default connect(mapStateToProps)(EditExpense);
