import React from 'react';
import myStore from '../redux/createStore';
import {Redirect} from 'react-router-dom';
import { AddExpenseDB, EditExpenseDB, RemoveExpenseDB } from '../redux/expenses';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export default class ExpenseForm extends React.Component {

	/*
	state = {
		description: "",
		amount: "",
		notes: "",
		recorded_on: moment(),
		calFocused: false,
		error_desc: undefined,
		submit: false,
		
	};*/

	constructor (props) {
		super(props);
		
		if (props.mode === "Add") {
			this.state = {
				description: "",
				amount: "",
				notes: "",
				recorded_on: moment(),
				calFocused: false,
				error_desc: undefined,
				submit: false,				
			};
		}

		else if (props.mode === "Edit" && props.expense) {
			this.state = {
				id: props.expense.id,
				description: props.expense.description,
				amount: props.expense.amount,
				notes: props.expense.notes,
				recorded_on: moment(props.expense.recorded_on),
				calFocused: false,
				error_desc: undefined,
				submit: false,				
			}
		}		
	}

	Handle_DescriptionChange = (e) => {		
		const description = e.target.value;		
		this.setState( () => ({description, error_desc:""}) );
	}

	Handle_AmountChange = (e) => {
		const amount = e.target.value;		
		if (amount.match(/^\d*(\.\d{0,2})?$/) ) {
			this.setState( () => ({amount, error_desc:""}));
		}
	}
	
	handle_NotesChange = (e) => {		
		const notes = e.target.value;
		this.setState( () => (  {notes} ));
	}

	handle_DateChange = (date_selected) => {			
		if (date_selected) {
			this.setState( () => (  {recorded_on: date_selected} ));
		}
		
	}
	handle_calFocusedChange = ({focused}) => {
		this.setState( () => (  {calFocused: focused} ));
	}
	
	handleSubmit = () => {	
					
		
		if (!this.state.description || !this.state.amount) {			
			this.setState( () => (  {error_desc: "Please fill in description/amount."} ));
		}
		else {
			const {id,recorded_on,amount,description, notes} = {...this.state};
			if (this.props.mode==="Add") {
				const namount = Number(amount);
				const expense = {recorded_on: recorded_on.valueOf(),amount:namount,description, notes}				
				const AddExpenseAction = AddExpenseDB(expense)
				myStore.dispatch(AddExpenseAction);
			}
			else {
				const namount = Number(amount);
				const expense = {id,recorded_on: recorded_on.valueOf(),amount:namount,description, notes}				
				const EdiExpenseAction = EditExpenseDB(expense)
				myStore.dispatch(EdiExpenseAction);
			}			
			this.setState( () => (  {submit: true} ));
		}
	}

	handleRemove = () => {
		console.log("remove");
		myStore.dispatch(RemoveExpenseDB(this.state.id));
		this.setState( () => (  {submit: true} ));
	}


	render() {

		if (this.state.submit) {
			return (<Redirect to='/' />)
		}
		else {

			return (
			
				<div id="ExpenseForm">
					<h2>Expense Form</h2>
					{this.state.error_desc && <p>{this.state.error_desc}</p>}
					Date: <SingleDatePicker
							date={this.state.recorded_on}
							onDateChange={this.handle_DateChange}
							focused={this.state.calFocused}
							onFocusChange={this.handle_calFocusedChange}
							id="expenseform_singledatepicker" 
							numberOfMonths={1}
							isOutsideRange={() => false}
							small={true}							
							/>
					<p>Description: <input type="text" id="description" value={this.state.description} onChange={this.Handle_DescriptionChange} placeholder="description" autoFocus  /></p>
					<p>Amount: <input type="text" id="amount" value={this.state.amount}  onChange={this.Handle_AmountChange} placeholder="amount" /></p>
					<p>Notes: <textarea id="notes" value={this.state.notes}  onChange={this.handle_NotesChange} placeholder="notes" /></p>
					<p><button onClick={this.handleSubmit}>Submit</button> <button onClick={this.handleRemove}>Remove</button></p>
				</div>

			)
		}
	}
}