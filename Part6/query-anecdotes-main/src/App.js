import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateVote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const updateNoteMutation = useMutation(updateVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes')
    },
  })

  const handleVote = (anecdote) => {
    updateNoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
  }

  const result = useQuery('notes', getAnecdotes)

  console.log(result)

  if (result.isLoading) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
