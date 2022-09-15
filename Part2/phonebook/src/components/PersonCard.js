const PersonCard = ({ name, number,deleteContact }) => {
  return (
    <p>
      {name} {number}{" "}<button onClick={deleteContact}>Delete</button>
    </p>
  );
};

export default PersonCard;
