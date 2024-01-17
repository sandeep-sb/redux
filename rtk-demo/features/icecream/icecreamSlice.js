const { createSlice } = require("@reduxjs/toolkit");
const { cakeActions } = require("../cake/cakeSlice");

const initialState = {
    numOfIceCream: 20,
}

const icecreamSlice = createSlice({
    name: "icecream",
    initialState,
    reducers: {
        ordered: (state) => {
            state.numOfIceCream--;
        },
        restocked: (state, action) => {
            state.numOfIceCream += action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(cakeActions.ordered, (state)=>{
            state.numOfIceCream--;
        })
    }
})

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions