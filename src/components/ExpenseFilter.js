import React from 'react';
//import {store} from '../redux/createstore';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates'
import { SetText, SetAmount, SetFilter, SetBeginDate, SetEndDate } from '../redux/filters';



class ExpenseFilter extends React.Component {

	
	state = {		
		calFocused: null			
	};

	
	handle_calFocusedChange = (focused) => {		
		this.setState( () => (  {calFocused: focused} ));
	}


	handle_DateChange = ({startDate,endDate}) => {				
		if (startDate) {
			const startDateAction = SetBeginDate(startDate);
			this.props.dispatch(startDateAction);
		}
		if (endDate) {
			const endDateAction = SetEndDate(endDate);
			this.props.dispatch(endDateAction);
		}
		
	}


	handleKeys = (e) =>
	{
		//console.log(e.target);
		const textbox_id = e.target.id;					
		if (e.keyCode === 13 || textbox_id==="description") {
			this.handleFilter(e);
		}

	}

	handleFilter = (e) =>
	{	
		const textbox_id = e.target.id;	
		const val = document.getElementById(textbox_id).value.trim(); // + String.fromCharCode(e.keyCode);
		//console.log(val);
				
		
		switch (textbox_id) {
			case "description": {
				this.props.dispatch(SetText(val));
				break;
			}			
			case "amount": {
				this.props.dispatch(SetAmount(val));
				break;
				}
			default: {
				//this.props.dispatch(SetBeginDate(1000));
				//this.props.dispatch(SortBy('amount'));
			}
		}			
		
		//e.target.value = "";
		
	}

	clear = () => {
		document.getElementById("amount").value= "";
		document.getElementById("description").value= "";
		this.props.dispatch(SetFilter());
	}

	ZeroToEmpty = (val) => {
		return val>0 ? val : "";
	}

	render = () => (
		<div>		
			<p> >= amount: <input type="text" id="amount" onKeyUp={this.handleKeys} defaultValue={this.ZeroToEmpty(this.props.filter.amount)} /></p>
			<p> description: <input type="text" id="description" defaultValue={this.props.filter.text} onKeyUp={this.handleKeys} /></p>
			Date Range {
			<DateRangePicker 
				startDate={this.props.filter.begin_date} // momentPropTypes.momentObj or null,
				startDateId={this.props.filter.begin_date.toString()} // PropTypes.string.isRequired,
				endDate={this.props.filter.end_date} // momentPropTypes.momentObj or null,
				endDateId={this.props.filter.end_date.toString()} // PropTypes.string.isRequired,				
				focusedInput={this.state.calFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
				onFocusChange={this.handle_calFocusedChange}
				onDatesChange={this.handle_DateChange}
				showClearDates={true}
				numberOfMonths={1}
				isOutsideRange={() => false}
				small={true}
			/>}
			
			<p><button onClick={this.clear}>Clear All</button></p>			
		</div>
	)
	
}

const mapStateToProps = (state) => {
	return {
		filter: state.filter
	};
}
export default connect(mapStateToProps)(ExpenseFilter);