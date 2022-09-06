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
    <p>{props.part1.name} {props.part1.exercises}</p>
  </div>)
  }

const PartTwo = (props) => {
  return (<div>
 <p>{props.part2.name} {props.part2.exercises}</p>
  </div>)
  }

const PartThree = (props) => {
  return (<div>
 <p>{props.part3.name} {props.part3.exercises}</p>
  </div>)
  }

const Content = (props) => {
  return(
    <div>
    <PartOne   part1={props.part1}/>
    <PartTwo  part2={props.part2}/>
    <PartThree part3={props.part3}/>
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
  const parts = [
 {
    name: 'Fundamentals of React',
    exercises: 10
  }
 ,{
    name: 'Using props to pass data',
    exercises: 7
  }
,{
    name: 'State of a component',
    exercises: 14
  }
]

  return (
    <>
    <Header course={course} />
    <Content part1={parts[0]} part2={parts[1]}  part3={parts[2]}/>
    <Total  exercises1={parts[0].exercises} exercises2={parts[1].exercises} exercises3={ parts[2].exercises}/>
    </>
  )
}

export default App