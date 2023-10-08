import React, { useReducer, createContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'

export const AuthContext = createContext()

const initialState = { isAuthenticated: true, users: { uid: "" } }
const reducer = ((state, action) => {

    switch (action.type) {
        case "LOGIN":
            return { isAuthenticated: true }
        case "LOGOUT":
            return { isAuthenticated: false }
        default:
            return state
    }
})


export default function AuthContextProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [users, setUsers] = useState({})

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                setUsers(user)
                dispatch({ type: "LOGIN", payload: { user } })
                console.log("user is signed");
                //..
            }else{
                console.log("user is logout")
            }

        });
    }, [])
    return (
        <AuthContext.Provider value={{ ...state, dispatch, users }}>
            {props.children}
        </AuthContext.Provider>
    )
}
