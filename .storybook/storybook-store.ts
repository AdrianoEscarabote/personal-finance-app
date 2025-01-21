import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "../redux/rootReducer"
import getMockState from "../utils/getMockState"

const initialState = getMockState()

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
})

export default store
