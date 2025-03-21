import { combineReducers } from "@reduxjs/toolkit"

import financeSlice from "./finance/reducer"

const rootReducer = combineReducers({
  financeSlice,
})

export default rootReducer
