import {useContext} from "react";
import {CartContext} from "../providers/CartProvider";


export const useCart = () => {
    const cart = useContext(CartContext);
    if (!cart) {
        throw Error('useCart needs to be used inside CartContext')
    }
    return cart;
}