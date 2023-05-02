import { filterChange } from '../reducers/filterReducer'
import { useDispatch, useSelector } from 'react-redux'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)

  return (
    <div>
      all
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('ALL'))}
        checked={filter === 'ALL'}
      />
      important
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('IMPORTANT'))}
        checked={filter === 'IMPORTANT'}
      />
      nonimportant
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('NONIMPORTANT'))}
        checked={filter === 'NONIMPORTANT'}
      />
    </div>
  )
}

export default VisibilityFilter
