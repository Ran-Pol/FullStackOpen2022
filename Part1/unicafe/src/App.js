import { useState } from 'react'


const Display = (props) => {
  if(props.text === "positive"){
return <div>{props.text} {props.value}%</div>
  }
return (<div>{props.text} {props.value}</div>)
}

const Button =  (props) => (
<button onClick={() => props.handleClick()}>{props.text}</button>
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
<Display text="all" value={allFeedback}/>
<Display text="average" value={avgFeedback ?avgFeedback: 0 }/>
<Display text="positive" value={(avgPosFeedback ?avgPosFeedback: 0) * 100 }/>
    </div>
  )
}
export default App



// Expand your application so that it shows more statistics about the gathered 
// feedback: the total number of collected feedback, the average score (good: 1, neutral: 0, bad: -1) 
// and the percentage of positive feedback.``