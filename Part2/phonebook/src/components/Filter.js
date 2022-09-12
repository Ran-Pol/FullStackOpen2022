const Filter = ({setNewFilterWord}) => {
  return (
    <div>
    Filter Phonebook:
    <input
      onChange={(e) => setNewFilterWord(e.target.value)}
      placeholder="Filter phonebook"
    />
  </div>
  )
}

export default Filter