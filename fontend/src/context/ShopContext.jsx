import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext()

const ShopeContextProvider = (props) => {
    const currency = '$'
    const delivery_fee = 10;
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})

    const addCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);

        if (!size) {
            toast.warning("select your size to add to cart")
            return
        }

        // Kiểm tra itemId có trong cartData chưa
        if (cartData[itemId]) {
            // Kiểm tra size đó có trong item đó chưa
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData)

    }

    const getCartCount = () => {
        let totalCount = 0;

        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const quantity = cartItems[itemId][size];
                if (quantity > 0) {
                    totalCount += quantity;
                }
            }
        }

        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    };


    const value = {
        products, currency, delivery_fee,
        search, showSearch, setSearch, setShowSearch,
        cartItems, addCart, getCartCount, updateQuantity
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopeContextProvider