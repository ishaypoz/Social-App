import {
	SET_USER,
	MARK_NOTIFICATIONS_READ,
	SET_ERRORS,
	CLEAR_ERRORS,
	SET_UNAUTHENTICATED,
	LOADING_UI,
	LOADING_USER
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatach) => {
	dispatach({ type: LOADING_UI });
	axios
		.post('/login', userData)
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			dispatach(getUserData());
			dispatach({ type: CLEAR_ERRORS });
			history.push('/');
		})
		.catch((err) => {
			dispatach({
				type: SET_ERRORS,
				payload: err.res.data
			});
		});
};

export const signupUser = (newUserData, history) => (dispatach) => {
	dispatach({ type: LOADING_UI });
	axios
		.post('/signup', newUserData)
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			dispatach(getUserData());
			dispatach({ type: CLEAR_ERRORS });
			history.push('/');
		})
		.catch((err) => {
			dispatach({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

const setAuthorizationHeader = (token) => {
	const FBIdToken = `Bearer ${token}`;
	localStorage.setItem('FBIdToken', FBIdToken);
	axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const logoutUser = () => (dispatch) => {
	console.log('ok');
	localStorage.removeItem('FBIdToken');
	delete axios.defaults.headers.common['Authorization'];
	dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatach) => {
	dispatach({ type: LOADING_USER });
	axios
		.get('/user')
		.then((res) => {
			dispatach({
				type: SET_USER,
				payload: res.data
			});
		})
		.catch((err) => console.log(err));
};
export const editUserDetails = (userDetails) => (dispatch) => {
	dispatch({ type: LOADING_USER });
	axios
		.post('/user', userDetails)
		.then(() => {
			dispatch(getUserData());
		})
		.catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
	dispatch({ type: LOADING_USER });
	axios
		.post('/user/image', formData)
		.then(() => {
			dispatch(getUserData());
		})
		.catch((err) => console.log(err));
};
export const markNotificationsRead = (notificationIds) => (dispatch) => {
	axios
		.post('/notifications', notificationIds)
		.then((res) => {
			dispatch({
				type: MARK_NOTIFICATIONS_READ
			});
		})
		.catch((err) => console.log(err));
};
