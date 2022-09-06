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
    <PartOne   part1={props.parts[0]}/>
    <PartTwo  part2={props.parts[1]}/>
    <PartThree part3={props.parts[2]}/>
  </div>
  )
}
const Total = (props) => {
  return(
  <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <>
    <Header course={course.name} />
    <Content parts={course.parts}/>
    <Total  parts={course.parts}/>
    </>
  )
}

export default App