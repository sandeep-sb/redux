const redux = require("redux");
const createStore = redux.createStore;

// initial State
const initialState = {
    numberOfCakes: 10
}


const BUY_CAKE = "BUY_CAKE";

// action creator function
const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: "first redux action"
    };
}

// reducer to implement action
const reducer = (state = initialState, action) => {
    switch(action.type){
        case BUY_CAKE: return{
            ...state,
            numberOfCakes : state.numberOfCakes - 1
        };
        default: return state;
    }
}

// creating a redux store
const store = createStore(reducer);
console.log("Initial State", store.getState());
// subscribe UI to the store. it return a function which can be used
// to unsubscribe to the liteners
const unsubscribe = store.subscribe(() => 
                        console.log("Current State", store.getState()));

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
// unregister listeners 
unsubscribe();