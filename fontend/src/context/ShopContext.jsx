import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext()

const ShopeContextProvider = (props) => {
    const currency = '$'
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

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
    const getCartAmount = () => {
        let amount = 0
        for (const ids in cartItems) {
            let itemInfor = products.find((product) => product._id === ids)
            for (const size in cartItems[ids]) {
                try {
                    if (cartItems[ids][size] > 0) {
                        amount += itemInfor.price * cartItems[ids][size]
                    }
                    // eslint-disable-next-line no-unused-vars
                } catch (error) { /* empty */ }
            }
        }
        return amount
    }
    const getProductData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/products/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message || "Failed to fetch products.");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            
        }
    }
    
   useEffect(() => {
    getProductData();
  }, []);

    const value = {
        products, currency, delivery_fee,
        search, showSearch, setSearch, setShowSearch,
        cartItems, addCart, getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopeContextProvider