import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopeContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.warning("select your size to add to cart");
      return;
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
    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          {
            itemId,
            size,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message || "Failed to add item to cart.");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("An error occurred while adding to cart.");
      }
    } else {
      toast.warning("Please login to add items to cart.");
      navigate("/login");
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (typeof quantity === "number" && quantity > 0) {
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
    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/upload",
          {
            itemId,
            size,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message || "Failed to update quantity.");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
        toast.error("An error occurred while updating quantity.");
      }
    }
  };

  const getCartAmount = () => {
    let amount = 0;
    for (const ids in cartItems) {
      let itemInfor = products.find((product) => product._id === ids);
      if (!itemInfor) continue;

      for (const size in cartItems[ids]) {
        const quantity = cartItems[ids][size];
        if (typeof quantity === "number" && quantity > 0) {
          amount += itemInfor.price * quantity;
        }
      }
    }
    return amount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/products/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to fetch products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getUserCart = async (token) => {
    if (token) {
      try {
        const res = await axios.get("http://localhost:4000/api/cart/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setCartItems(res.data.cartData);
        }
      } catch (error) {
        console.log("Error fetching cart:", token);
        console.error("Error fetching cart:", error);
        toast.error("An error occurred while fetching cart.");
      }
    }
  };

  useEffect(() => {
    getProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    showSearch,
    setSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopeContextProvider;
