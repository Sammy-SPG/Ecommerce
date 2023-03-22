import { createContext, useReducer } from "react";
import UserReducer from "./userReducer";

const UserContex = createContext();

const UserProvider = ({ children }) => {

    const initialState = {
        user: {}
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);

    return (
        <UserContex.Provider value={{ state, dispatch }}>{children}</UserContex.Provider>
    );
}


export { UserContex, UserProvider };