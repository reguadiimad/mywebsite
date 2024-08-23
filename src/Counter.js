import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incByAmnt } from "./rdx_toolKit/features/counterSlice";

export default function Counter(){
    const count = useSelector(state=>state.counter.value);
    const dispatch = useDispatch()

    return(<>
        <h1>djd</h1>
    </>)
}