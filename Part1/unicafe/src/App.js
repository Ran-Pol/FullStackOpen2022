import { useState } from 'react'


const Display = (props) => <div>{props.text} {props.value}</div>

const Button =  (props) => (
<button onClick={() => props.handleClick()}>{props.text}</button>
)

const Statistics = (props) => (
  props.text === "positive"? <div>{props.text} {props.value}%</div>: <div>{props.text} {props.value}</div>
)


const App = () => {
  const [goodValue, setGoodValue] = useState(0)
  const [neutralValue, setNeutralValue] = useState(0)
  const [badValue, setBadValue] = useState(0)
const allFeedback = goodValue + neutralValue + badValue;
const avgFeedback = (goodValue - badValue)/allFeedback;
const avgPosFeedback = goodValue/allFeedback;

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
<Statistics text="all" value={allFeedback}/>
<Statistics text="average" value={avgFeedback ?avgFeedback: 0 }/>
<Statistics text="positive" value={(avgPosFeedback ?avgPosFeedback: 0) * 100 }/>
    </div>
  )
}

export default App
