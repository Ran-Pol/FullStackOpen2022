import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(_, action) {
      return action.payload
    },
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
