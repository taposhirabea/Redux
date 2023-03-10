import { SIDEBAR_OPEN, SIDEBAR_CLOSE, DECREASE, INCREASE, RESET } from "../actions";

const products_reducer = (state, action) => {
    if (action.type === SIDEBAR_OPEN) {
        return {...state, isSidebarOpen: true}
    }
    if (action.type === SIDEBAR_CLOSE) {
        return {...state, isSidebarOpen: false}
    }

    if (action.type === DECREASE) {
        state.amount = state.amount - 1
      if (state.amount < 1) {
            state.amount = 1
          }
        return {...state, amount: state.amount}
    }
    if (action.type === INCREASE) {
        return {...state, amount: state.amount + 1}
    }
    if (action.type === RESET) {
     return { ...state, amount: 1 };
  }

    throw new Error(`No Matching "${action.type}" - action type `)
}

export default products_reducer