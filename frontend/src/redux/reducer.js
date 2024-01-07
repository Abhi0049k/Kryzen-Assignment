import { FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, REQUEST } from "./actionTypes"

const initialState = {
    isAuth: false,
    isError: false,
    isLoading: false,
    errorMessage: '',
    token: ''
}

export const reducer = (state = initialState, {type, payload})=>{
    switch(type){
        case REQUEST:
            return {...state, isLoading: true}
        case FAILURE:
            return {...state, isLoading: false, isError: true, errorMessage: payload}
        case LOGIN_SUCCESS:
            return {...state, isLoading: false, isError: false, token: payload, isAuth: true}
        case REGISTER_SUCCESS:
            return {...state, isLoading: false, isError: false}
        case LOGOUT_SUCCESS:
            return {...state, isLoading: false, isError: false, token: '', isAuth: false}
        default:
            return state;
    }
}
