import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Here is a notification',
  reducers: {
    setNotification(_, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    },
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
