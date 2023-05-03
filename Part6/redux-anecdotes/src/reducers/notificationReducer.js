import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', timeout: 0 },
  reducers: {
    setNotification(state, action) {
      console.log("hh")
      state.message = action.payload.message
      state.timeout = action.payload.timeout
    },
    removeNotification(state) {
      state.message = ''
      state.timeout = 0
    },
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
