import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"

import rootReducer from "./rootReducer"

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
