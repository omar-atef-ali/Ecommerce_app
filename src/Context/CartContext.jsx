import { createContext, useContext, useEffect, useState } from 'react'
import api from "../api";
// import { userContext } from './userContext';
import toast from 'react-hot-toast';
export let CartContext = createContext()


export default function CartContextProvider(props) {
  const [cartvalue, setcartvalue] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  async function getCart() {
    try {
      const userToken = localStorage.getItem('userToken') || localStorage.getItem('token');
      if (userToken) {
        let { data } = await api.get(`/Cart`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        console.log("Cart API Response:", data);
        const finalData = Array.isArray(data) ? data : (data.items || data.cartItems || data.data || []);
        setcartvalue(finalData)
      }
      else {
        setcartvalue(localStorage.getItem('local cart') ? JSON.parse(localStorage.getItem('local cart')) : [])
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCart();
  }, []);


  return (
    <>
      <CartContext.Provider value={{ cartvalue, getCart, setcartvalue, isCartOpen, setIsCartOpen }}>
        {props.children}
      </CartContext.Provider>
    </>
  )
}
