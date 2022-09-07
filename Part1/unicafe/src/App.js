import { useState } from 'react'


const Display = (props) => <div>{props.text} {props.value}</div>

const Button =  (props) => (
<button onClick={() => props.handleClick()}>{props.text}</button>
)


const App = () => {
  const [goodValue, setGoodValue] = useState(0)
  const [neutralValue, setNeutralValue] = useState(0)
  const [badValue, setBadValue] = useState(0)

  const setToGoodValue = (newValue) => {
    console.log('value now', newValue)
    setGoodValue(newValue)
  }
  const seTotNeutralValue = (newValue) => {
    console.log('value now', newValue)
    setNeutralValue(newValue)
  }
  const setTBaddValue = (newValue) => {
    console.log('value now', newValue)
    setBadValue(newValue)
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={() => setToGoodValue(goodValue + 1)} text="Good" />
      <Button handleClick={() => seTotNeutralValue(neutralValue + 1)} text="Neutral"/>
      <Button handleClick={() => setTBaddValue(badValue + 1)} text="Bad" />
      <h2>Statistics</h2>
<Display text="good" value={goodValue}/>
<Display text="Neutral" value={neutralValue}/>
<Display text="Bad" value={badValue}/>
    </div>
  )
}
export default App


