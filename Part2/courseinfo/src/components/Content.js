import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((item) => (
        <Part key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Content;
