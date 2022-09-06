import { useState } from 'react'

const Display = ({counter}) =><div>{counter}</div>


const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>




const App = () => {
  const [ counter, setCounter ] = useState(0)
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  
  const setToZero = () => setCounter(0)

  return (
  <>
      <Display counter={counter}/>
      {/* When one of the buttons is clicked, the event handler is executed. 
      The event handler changes the state of the App component with the setCounter function. 
      Calling a function which changes the state causes the component to rerender. */}
      <Button onClick={increaseByOne} text="plus"/>
      <Button onClick={decreaseByOne} text="minus"/>
      <Button onClick={setToZero} text="zero"/>
</>

  )
}  

export default App