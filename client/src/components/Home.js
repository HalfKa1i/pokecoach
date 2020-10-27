import React, {useState, useEffect} from 'react';
import Select from 'react-select'

function Home() {
    useEffect(() => getOptions(), []);

    const [options, setOptions] = useState(null);

    const getOptions = () => {
        fetch('/api/pokemon')
            .then(response => response.json())
            .then(data => setOptions(data));
    };

    const battlePokemon = (data) => {
      fetch(`/api/pokemon/${data.value}`)
          .then(response => response.json())
          .then(data => console.log(data));
    };

    return (
        <div>
            <h2>Who are you battling?</h2>
            <Select options={options} isClearable={true} isSearchable={true} placeholder="Search for Pokémon" onChange={battlePokemon}/>
        </div>
    );
}

export default Home;