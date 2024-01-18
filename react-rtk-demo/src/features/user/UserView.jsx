import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./userSlice";


export const UserView = () => {
    const user = useSelector((state) => {return state.user});
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchUsers());
    }, [])

    
    console.log(user);
    return(
        <div>
            {/* {console.log(user)} */}
            <h2>List of users</h2>
            {user.loading && <div>Loading...</div>}
            {!user.loading && user.error ? 
                <div>Error: {user.error} </div> : null}
            {!user.loading && user.users.length ? 
            <ul>
                {user.users.map((a) => (
                <li key={a.id}>{a.name}</li>
            ))}</ul> : null}
        </div>
    );
}