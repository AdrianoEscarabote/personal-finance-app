import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface demoState {
  demoMode: boolean
}

const initialState: demoState = {
  demoMode: false,
}

const demoSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDemoMode: (state, action: PayloadAction<boolean>) => {
      state.demoMode = action.payload
    },
  },
})

export const { setDemoMode } = demoSlice.actions
export default demoSlice.reducer
