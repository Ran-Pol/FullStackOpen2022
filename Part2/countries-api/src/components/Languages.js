import Language from "./Language";

const Languages = ({ languages }) => {
  return (
    <ul>
      {Object.entries(languages).map(([langcode, language]) => {
        return <Language language={language} key={langcode} />;
      })}
    </ul>
  );
};

export default Languages;
