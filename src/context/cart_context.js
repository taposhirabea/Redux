import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducer/cart_reducer'
import localCart from '../Utils/localCart'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  INCREASE,
  DECREASE,
  REMOVE,
} from '../actions'

function getCartFromLocalStorage(){
    return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) 
    : [];
}

// const initialState = {
//   cart: getLocalStorage(),
// }

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  //const [state, dispatch] = useReducer(reducer, initialState)
  const [cart, setCart] = React.useState(getCartFromLocalStorage());
   const [total, setTotal] = React.useState(0);
    const [cartItems, setCartItems] = React.useState(0);

    //  React.useEffect(() => {
    //     localStorage.setItem("cart", JSON.stringify(cart));
    //     // cart items
    //     let newCartItems = cart.reduce((total, cartItem) => {
            
    //         return total += cartItem.amount;
    //     }, 0);
    //     setCartItems(newCartItems);
    //     // cart total
    //     let newTotal = cart.reduce((total, cartItem) => {
    //         return (total += cartItem.amount * cartItem.price);
    //     }, 0);
    //     newTotal = parseFloat(newTotal.toFixed(2));
    //     setTotal(newTotal);
    // }, [cart]);

  const addToCart = ( product) => {
     //dispatch({ type: ADD_TO_CART, payload: {product, id} });

    const {id, image, name, price} = product
    const item = [...cart].find(item => item.id === id)
    if(item) {
      increaseAmount(id);
      return;
    }
    else{
      const newItem = {id, image, name, price, amount: 1}
      const newCart = [...cart, newItem];
      setCart(newCart);
    }
        
  }
  const increaseAmount= id => {
        //dispatch({ type: INCREASE, payload:id });
        const newCart = [...cart].map(item => {
          return item.id === id ? {
            ...item, amount: item.amount + 1
          } : { ...item };
        })
        setCart(newCart);
    };
    const decreaseAmount = (id, amount) => {
        // if(amount === 1) {
        //     dispatch({ type:REMOVE_CART_ITEM, payload:id });
        //     return ;
        // }
        // else {
        //     dispatch({ type:DECREASE, payload:id });
        // }
        if (amount === 1) {
          removeItem(id);
          return;
        }
        else{
          const newCart = [...cart].map(item => {
          return item.id === id ? {
            ...item, amount: item.amount - 1
          } : { ...item };
        })
        setCart(newCart);
        }
    };
  // remove item
  const removeItem = (id) => {
    //dispatch({ type: REMOVE_CART_ITEM, payload: id })
    const newCart = ([...cart].filter(item => item.id !== id))
    setCart(newCart)
  }
  // toggle amount
  // const toggleAmount = (id, value) => {
  //   dispatch({
  //     type: TOGGLE_CART_ITEM_AMOUNT,
  //     payload: {
  //       id,
  //       value,
  //     },
  //   })
  // }
  // clear cart
  const clearCart = () => {
    //dispatch({ type: CLEAR_CART })
    setCart([])
  }
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    //dispatch({ type: COUNT_CART_TOTALS })
    let newCartItems = cart.reduce((total, cartItem) => {
            
            return total += cartItem.amount;
        }, 0);
        setCartItems(newCartItems);
        // cart total
        let newTotal = cart.reduce((total, cartItem) => {
            return (total += cartItem.amount * cartItem.price);
        }, 0);
        newTotal = parseFloat(newTotal.toFixed(2));
        setTotal(newTotal);
  }, [cart])
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItem, clearCart, total, cartItems, increaseAmount,
      decreaseAmount,
    removeItem }}
    >
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}