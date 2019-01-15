import myStore from './createStore';
import {AddExpense} from './expenses';
import {SortBy,SetBeginDate,SetText} from './filters';
import {getVisibleExpenses} from './views'

console.log('runRedux.js');


const ex1= { description: 'A', note: '', amount: 1200, recorded_on: 500 };
const ex2= { description: 'B', note: '', amount: 80, recorded_on: 200 };
const ex3= { description: 'C', note: '', amount: 1600, recorded_on: 1500 };
const ex4= { description: 'D', note: '', amount: 40, recorded_on: 2000 };
/* add */

const exr1 = store.dispatch(AddExpense(ex1));
const exr2 = store.dispatch(AddExpense(ex2));
const exr3 = store.dispatch(AddExpense(ex3));
const exr4 = store.dispatch(AddExpense(ex4));

store.dispatch(SetBeginDate(1000));
store.dispatch(SetText('A'));
store.dispatch(SortBy('amount'));

//console.log(store.getState());
console.log(getVisibleExpenses(store.getState()));
