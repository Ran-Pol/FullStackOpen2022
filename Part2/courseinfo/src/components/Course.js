import Content from "./Content";
import Header from "./Header";

const Course = ({ courses }) => {
const allCourses = courses.map((item, i) =>{
    const {name, parts} = item;
   return(
    <div key={i}>
    <Header name={name} />
    <Content parts={parts} />
  </div>
   )}
)

return allCourses

};

export default Course;
