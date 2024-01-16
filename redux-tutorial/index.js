const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();


// initial State of cake
const cakeState = {
    numberOfCakes: 10
}

// initial state of inceCream
const iceCreamState = {
    numberOfIceCreams: 20
}

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// action creator function for cake
const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: "first redux action"
    };
}

// action creater function for ice-cream
const buyIceCream = () => {
    return {
        type: BUY_ICECREAM
    }
}

// reducer to implement action for cakes
const cakeReducer = (state = cakeState, action) => {
    switch(action.type){
        case BUY_CAKE: return{
            ...state,
            numberOfCakes : state.numberOfCakes - 1
        };
        default: return state;
    }
}

// reducer to implement action for icecreams
const iceCreamReducer = (state = iceCreamState, action) => {
    switch(action.type){
        case BUY_ICECREAM: return{
            ...state,
            numberOfIceCreams: state.numberOfIceCreams - 1
        };
        default: return state;
    }
}

// creating a redux store by combining both reducer functions
const rootReducer = redux.combineReducers({
    cakes: cakeReducer,
    iceCreams: iceCreamReducer
})
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial State", store.getState());
// subscribe UI to the store. it return a function which can be used
// to unsubscribe to the liteners
const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
// unregister listeners 
unsubscribe();