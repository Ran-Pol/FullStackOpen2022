import { useState} from 'react';
import CountryProfile from './CountryProfile'

const Country = ({ country, singleCountry }) => {

    const [displaySwitch, setdisplaySwitch] = useState(false);
  
    const handleDisplayOnOff= () => {
      setdisplaySwitch(!displaySwitch);
    };

  return (
    <>
    {singleCountry ? (
      <CountryProfile country={country} />
    ) : (
      <dt>
        {country.name.common}{' '}
        <button onClick={handleDisplayOnOff}>Show</button>
        {displaySwitch && <CountryProfile country={country} />}
      </dt>
    )}
  </>
  )
}

export default Country
