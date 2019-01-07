import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Expense from './Expense';
import ExpenseFilter from './ExpenseFilter';
import {getVisibleExpenses} from '../redux/views';
import {SortBy } from '../redux/filters';
import ExpenseTotal from './ExpenseTotal';

class ExpenseList extends React.Component {
	
	state = { edit_expense_id: undefined }

	handle_ClickOnExpense = (expense_id) => {
		//console.log(expense_id);		
		this.setState( () => (  {edit_expense_id: expense_id} )); 
	}

	render() {

		if (this.state.edit_expense_id) {
			return (<Redirect push to={'/edit/'+this.state.edit_expense_id} />)
		}
		else {
			return (
				<div className="ExpenseList">
					<h1>Expense List</h1>
					<ExpenseFilter />
					<ExpenseTotal expenseList={this.props.expenses} />
					<table className="ExpenseListTable">
						<thead>			
							<tr>
								<th className={this.props.filter.sort==="description"?"sortcol": "colHeader"} onClick={()=> this.props.dispatch(SortBy("description"))}>description {this.props.filter.sort==="description" && sortArrow(this.props.filter.sort_asc)}</th>
								<th className={this.props.filter.sort==="amount"?"sortcol": "colHeader"} onClick={()=> this.props.dispatch(SortBy("amount"))}>amount {this.props.filter.sort==="amount" && sortArrow(this.props.filter.sort_asc)}</th>
								<th className={this.props.filter.sort==="recorded_on"?"sortcol": "colHeader"} onClick={()=> this.props.dispatch(SortBy("recorded_on"))}>recorded_on {this.props.filter.sort==="recorded_on" && sortArrow(this.props.filter.sort_asc)}</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{ this.props.expenses.map( (val,idx) => <Expense key={val.id} expense={val} handle_click={this.handle_ClickOnExpense} /> ) }
						</tbody>
					</table>		
				</div>
			)
		}
	}
}	

//sort arrow
const ascArrow = '\u25B2';
const descArrow = '\u25BC';
const sortArrow = (sort_asc) => {
	return sort_asc ? ascArrow : descArrow;
}

const mapStateToProps = (state) =>
{ 
	return getVisibleExpenses(state.expenses, state.filter); // returns {expense: [...]}
	
	/*
	return {
		expenses: state.expenses,
		filters: state.filter
	}*/
}

// up the ExpenseList to HigherOrderComponent[redux]
//(first pass mapping of which parts of the "state" we want in as props, and thatn connect() returns the higher order function to convert expense list).
export default connect(mapStateToProps)(ExpenseList);
	//const ConnectedExpenseList = connect(mapStateToProps)(ExpenseList); 
	//export default ConnectedExpenseList;