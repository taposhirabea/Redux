import React, {useContext,useReducer} from 'react'
import products_reducer from '../reducer/products_reducer'
import { SIDEBAR_OPEN, SIDEBAR_CLOSE, DECREASE, INCREASE, RESET } from '../actions'

const initialState = {
    isSidebarOpen: false,
    amount: 1,
    
}
const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(products_reducer, initialState)
    
    const openSidebar = () => {
        dispatch({ type: SIDEBAR_OPEN })
    }
    const closeSidebar = () => {
        dispatch({ type: SIDEBAR_CLOSE})
    }
    const decrease = () => {
        dispatch({ type: DECREASE })
    }
    const increase = () => {
        dispatch({ type: INCREASE})
    }
     const reset = () => {
    dispatch({ type: RESET })
    }
    
    
    return (
        <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar, decrease, increase, reset}}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProductsContext = () => {
    return useContext(ProductsContext)
}