const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")
const axios = require("axios");

const initialState = {
    loading: false,
    users: [],
    error: ""
}

// generates pending, fulfilled and rejected action types
const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
    return axios.get("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.data.map((user) => user.id))
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducer: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = "";
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = []
            state.error = action.error.message;
        })
    }
})

module.exports = userSlice.reducer;
// since fetchUsers generate action types, we export fetchUsers function
module.exports.fetchUsers = fetchUsers;