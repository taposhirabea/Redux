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
 
  ADD_TO_CART,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  // products_loading: false,
  // products_error: false,
  // products: [],
  
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  //const [state, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebar = () => {
    //dispatch({ type: SIDEBAR_OPEN })
    setIsSidebarOpen(true);
  }
  const closeSidebar = () => {
    //dispatch({ type: SIDEBAR_CLOSE })
    setIsSidebarOpen(false);
  }
  
const [todos, setTodos] = useState([]);

  const fetchProducts = async () => {
    // dispatch({ type: GET_PRODUCTS_BEGIN })
    // try {

    //   await getDocs(collection(fs, "Products"))
    //         .then((querySnapshot)=>{               
    //             const newData = querySnapshot.docs
    //                 .map((doc) => ({...doc.data(), id:doc.id }));
    //             setTodos(newData);                
    //             console.log(todos, newData);

    //             dispatch({ type: GET_PRODUCTS_SUCCESS, payload: newData })
    //         })
    //   //  const response = await axios.get(url)
    //   // const products = response.data
    //   //  dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    // } catch (error) {
    //   dispatch({ type: GET_PRODUCTS_ERROR })
    // }

    setLoading(true)
      await getDocs(collection(fs, "Products"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setTodos(newData);                
                console.log(todos, newData);
                setLoading(false)
                
                const featured_products = newData.filter(
                  (product) => product.featured === true
                )
                setProducts(newData)
                setFeatured(featured_products)
                setLoading(false)
            })
  }



  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        // ...state,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        
        products,
        loading,
        featured,
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