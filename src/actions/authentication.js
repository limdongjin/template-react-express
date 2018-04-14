import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    
	AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
	
	AUTH_GET_STATUS,     
	AUTH_GET_STATUS_SUCCESS,     
	AUTH_GET_STATUS_FAILURE,

	AUTH_LOGOUT
} from './ActionTypes';

import axios from 'axios';

/*============================================================================
    authentication
==============================================================================*/

/* REGISTER */
export function registerRequest(email, password, user_name) {
    return (dispatch) => {
        // Inform Register API is starting
        dispatch(register());

        return axios.post('/api/users/signup', { "email": email, "password": password, "username": user_name })
        .then((response) => {
            dispatch(registerSuccess());
        }).catch((error) => {
            dispatch(registerFailure(error.response.data.code.error));
        });
    };

}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS,
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}

/* LOGIN */
export function loginRequest(email, password) {
    /* To be implemented */
	return (dispatch) => {
	    // Inform Login API is starting
        dispatch(login());

        // API REQUEST
        return axios.post('/api/users/signin', { "email": email, "password": password})
        .then((response) => {
            // SUCCEED
            dispatch(loginSuccess(email));
        }).catch((error) => {
            // FAILED
            dispatch(loginFailure());
        });	
	}
}

/* GET STATUS */
export function getStatusRequest() {
    return (dispatch) => {
        // inform Get Status API is starting
        dispatch(getStatus());

        return axios.get('/hellosession')
        .then((response) => {
			console.log(response.data);
            dispatch(getStatusSuccess(response.data.username));
        }).catch((error) => {
			console.log("no");
            dispatch(getStatusFailure());
        });
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(username) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        username
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

/* LOGOUT */
export function logoutRequest() {
    return (dispatch) => {
        return axios.get('/api/users/logout')
        .then((response) => {
            dispatch(logout());
        });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}
