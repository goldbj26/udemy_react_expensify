import React from 'react';
import {store} from '../redux/createStore';
import moment from 'moment';
import {RemoveExpense } from '../redux/expenses';
import numeral from 'numeral'


const Expense = (props) => (
				
	<tr id={props.expense.id} className="expense" onClick={() => {props.handle_click(props.expense.id)}}>
		<td className="expense_description">{props.expense.description}</td>
		<td className="expense_amount">{numeral(props.expense.amount).format('$0,0.00')}</td>
		<td className="expense_recordedon">{moment(props.expense.recorded_on).format("YYYY-MM-DD")}</td>
		<td className="expense_remove" onClick={ (e) => {e.stopPropagation(); store.dispatch(RemoveExpense(props.expense.id));}} >remove</td>
	</tr>		
)
export default Expense;