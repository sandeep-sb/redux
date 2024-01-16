const redux = require("redux");
const {thunk} = require("redux-thunk");
const axios = require("axios");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
    loading: false,
    data: [],
    error: ""
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// action creators
const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST,
    }
}

const fetchUserSuccess = (data) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: data
    }
}

const fetchUserFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}
 // reducer
const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST: return{
            ...state,
            loading : true,
        }
        case FETCH_USERS_SUCCESS: return{
            ...state,
            loading: false,
            data: action.payload,
            error: ""
        }
        case FETCH_USERS_FAILURE: return{
            ...state,
            loading: false,
            data: [],
            error: action.payload
        }
        default: return state;
    }
}

// thunk async action creator
function fetchUsers(){
    return function (dispatch){
        dispatch(fetchUserRequest());
        axios("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            const users = response.data.map(user => user.id);
            dispatch(fetchUserSuccess(users))
        })
        .catch(error => {
            console.log(error.message);
            dispatch(fetchUserFailure(error.message));
        })
    }
}

// store
const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());