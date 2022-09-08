import { useState } from 'react'

const Button = ({handleCLick, text}) => <button onClick={() => handleCLick()}>{text}</button>

const MostVotes = ({votesArray, allAnectodes}) => {
const sortedArray = votesArray.map((a,b) => [a,b]).sort((a,b)=> a[0] - b[0]);  
const [numVotes, index] = sortedArray[allAnectodes.length-1]
if (numVotes){
  return(
<p>{allAnectodes[index]} has {numVotes}</p>
  )
}
return <p>No Votes Yet</p>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const max = anecdotes.length;
  const [selected, setSelected] = useState(0)
  const [votesCount, setVoteCount] = useState(Array(max).fill(0,0))

  const setToGoodValue = () => {
    setSelected(Math.floor(Math.random() * max))
  }

  const seToVotesCount = () => {
    const newArray = [...votesCount];
    newArray[selected] += 1;
    setVoteCount(newArray);
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]} has a total of {votesCount[selected]} votes</p>
      <Button handleCLick={seToVotesCount} text="vote"/>
      <Button handleCLick={setToGoodValue} text="Next anecdote"/>
      <h2>Anecdote with most votes</h2>
      <MostVotes votesArray={votesCount} allAnectodes={anecdotes}/>
    </div>

  )
}

export default App




