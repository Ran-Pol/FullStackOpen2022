import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((item) => (
        <Part key={item.id} item={item} />
      ))}
      <p><strong>Total of {parts.reduce((total, item) => (total += item.exercises), 0)} excercises</strong></p>
    </div>
  );
};

export default Content;
