import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (notification.timeout > 0) {
    setTimeout(() => {
      dispatch(removeNotification())
    }, notification.timeout * 1000)
  }

  if (notification.message === '') {
    return null
  }

  return <div style={style}>{notification.message}</div>
}

export default Notification
