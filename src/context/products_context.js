import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import reducer from '../reducer/products_reducer'
import { products_url as url } from '../linkData'
import {fs, storage} from '../firebase'
import { collection, getDocs } from "firebase/firestore";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  ADD_TO_CART,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }
  
const [todos, setTodos] = useState([]);

  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {

      await getDocs(collection(fs, "Products"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setTodos(newData);                
                console.log(todos, newData);

                dispatch({ type: GET_PRODUCTS_SUCCESS, payload: newData })
            })
      //  const response = await axios.get(url)
      // const products = response.data
      //  dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      
      
      const response = await axios.get(url)
      const singleProduct = response.data
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  useEffect(() => {
    fetchProducts(url)
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,

      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}