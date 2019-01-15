


export const LoginAction = (uid) => ({
	type: 'LOGIN',
	login: {uid: uid}
});

export const LogoutAction = () => ({
	type: 'LOGOUT',
	login: {uid: undefined}
});

const loginReducerDefaultState = {uid: undefined};



export const loginReducer = (state = loginReducerDefaultState, action) => {	
	switch (action.type) {
		case 'LOGIN':
		case 'LOGOUT':
			return {
				...state,
				...action.login
			}		
		default:
			return state;
	}		
}