// Refactor the code so that it consists of three new components: 
// Header, Content, and Total. All data still resides in the App component, 
// which passes the necessary data to each component using props. 


const Header = (props) => {
  return (<div>
  <h1>{props.course}</h1>
</div>)
}

const PartOne = (props) => {
  return (<div>
    <p>{props.name} {props.number}</p>
  </div>)
  }

const PartTwo = (props) => {
  return (<div>
 <p>{props.name} {props.number}</p>
  </div>)
  }

const PartThree = (props) => {
  return (<div>
 <p>{props.name} {props.number}</p>
  </div>)
  }

const Content = (props) => {
  return(
    <div>
    <PartOne  name={props.part1} number={props.exercises1}/>
    <PartTwo  name={props.part2} number={props.exercises2}/>
    <PartThree  name={props.part3} number={props.exercises3}/>
  </div>
  )
}
const Total = (props) => {
  return(
  <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
    <Header course={course} />
    <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3}/>
    <Total  exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </>
  )
}



export default App