import { createContext, useReducer } from "react";
import CartReducer from "./CartReducer";

const CartContex = createContext();

const CartProvider = ({ children }) => {

    const initialState = {
        cart: {}
    }

    const [state, dispatch] = useReducer(CartReducer, initialState);

    return (
        <CartContex.Provider value={{ state, dispatch }}>{children}</CartContex.Provider>
    );
}


export { CartContex, CartProvider };