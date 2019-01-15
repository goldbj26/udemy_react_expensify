import * as myFirebase from 'firebase';
import {AddExpense} from './expenses';
import {history} from '../AppRouter';
import myStore from './createStore';
import {LoginAction,LogoutAction} from './auth'
//import moment from 'moment';
console.log('firebase.js running');




/************************************************************************************** */

const config = {
	apiKey: "AIzaSyAC2BfjxbMjgEcUN8DhPV0x8h_KgRAot0Q",
	authDomain: "expensify-3911d.firebaseapp.com",
	databaseURL: "https://expensify-3911d.firebaseio.com",
	projectId: "expensify-3911d",
	storageBucket: "expensify-3911d.appspot.com",
	messagingSenderId: "980956474644"
  };


myFirebase.initializeApp(config);

export default myFirebase;

/************************************************************************************** */

// Firebase LOGIN / LOGOUT

const googleAuth = new myFirebase.auth.GoogleAuthProvider();

export const myFirebaseLogin = () => {
	return () => {
		return myFirebase.auth().signInWithPopup(googleAuth);
	}
}

// simple logout (not an action)
export const myFirebaseLogOut = () => {
	 myFirebase.auth().signOut();
}

// OnLogin() Load Data / Logout() clear data
myFirebase.auth().onAuthStateChanged( (user) => {
	if (user) {
		console.log('login ' + user.uid);
		LoadData(user.uid);
		const myLoginAction = LoginAction(user.uid);
		myStore.dispatch(myLoginAction);
		if (history.location.pathname==='/')
			history.push('/dashboard');
	}
	else {
		console.log('logoff');
		//renderAppp();
		const myLoginAction = LogoutAction();
		myStore.dispatch(myLoginAction);
		myStore.getState().expenses = []; //myStore.dispatch(RemoveExpense(id)); should write a removeAll
		history.push('/');
	}
})


const LoadData = (uid) => {
	
	
	/* A] FIREBASE - LOAD DATA */
	myFirebase.database().ref(`users/${uid}/expenses`)
	.once('value')
	.then( (snapshot) => {
		const val = snapshot.val();
		//console.log(val);		
		for (var key in val) {
			//console.log();
			const exp = val[key];
			const id = {id: key};
			const expense = {...id,...exp};
			myStore.dispatch(AddExpense(expense));
		}		
	})
	.catch( (e) => {
		console.log("Error Fetching data",e);
	})
		
}

export const fbPath = (eid="") => (`users/${myStore.getState().login.uid}/expenses${'/'+eid}`);

