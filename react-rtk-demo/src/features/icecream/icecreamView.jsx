import React, { useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import { ordered, restocked } from "./icecreamSlice";

export const IcecreamView = () => {
    const [userInput, setUserInput] = useState(3);
    const numOfIcecream = useSelector((state) => state.icecream.numOfIceCream);
    const dispatch = useDispatch();
    return(
        <div>
            <input 
                type="number" 
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)}
            />
            <h2>Number of ice creams - {numOfIcecream}</h2>
            <button onClick={() => dispatch(ordered())}>Buy ice cream</button>
            <button onClick={() => dispatch(restocked(Number(userInput)))}>Restock ice creams</button>
        </div>
    );
}