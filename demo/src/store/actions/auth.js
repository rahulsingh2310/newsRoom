import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    };
};

export const authLoginSuccess = (token, userId, name) => {
    return {
        type: actionTypes.AUTH_LOGIN_SUCCESS,
        idToken: token,
        userId: userId,
        name : name,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authlogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'http://localhost:8080/auth/login';
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.userId);
            console.log(response.data.token);
            dispatch(authSuccess(response.data.token, response.data.userId));
            // dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err.response.data.message);

            dispatch(authFail(err.response.data.message));
        });
    };
};

export const authsignup = (name, email, password, subscribe) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            name : name,
            email: email,
            password: password,
            subscriptions : subscribe,
            returnSecureToken: true
        };
        let url = 'http://localhost:8080/auth/signup';

        axios.put(url, authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('email', response.data.email);
            dispatch(authLoginSuccess(response.data.token, response.data.userId, response.data.name));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err.response.data.data[0].msg);
            dispatch(authFail(err.response.data.data[0].msg));
        });
    };
};


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if (expirationDate <= new Date()) {
            //     dispatch(logout());
            // } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                // dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            // }   
        }
    };
};