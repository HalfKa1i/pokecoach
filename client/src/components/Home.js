import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";


import './Home.css';

const Home = () => {
    useEffect(() => getOptions(), []);

    const [options, setOptions] = useState(null);
    const [pokemon, setPokemon] = useState(null);

    const getOptions = () => {
        fetch('/api/pokemon')
            .then(response => response.json())
            .then(data => setOptions(data));
    };

    const getPokemon = (data) => {
      fetch(`/api/pokemon/${data.value}`)
          .then(response => response.json())
          .then(data => setPokemon(data));
    };

    return (
        <div>
            <h1>Who are you battling?</h1>
            <Select options={options} isClearable={true} isSearchable={true} placeholder="Search for Pokémon" onChange={getPokemon}/>

            <hr/>

            <div>{pokemon && (
                <div>
                    <h3>{pokemon.name}</h3>
                    <Image src={pokemon.spriteUrl} fluid className="pokemon-sprite" />

                    <div>
                        {pokemon.types.map((value) => {
                            return  <Badge pill variant="primary" className={value}>{value}</Badge>
                        })}
                    </div>

                    <br/>

                    <Card border="danger"  className="text-center">
                        <Card.Header>Weaknesses</Card.Header>
                        <Card.Body>
                            {pokemon.weaknesses.map((value) => {
                                return  <Badge pill variant="primary" className={value}>{value}</Badge>
                            })}
                        </Card.Body>
                    </Card>
                </div>
            )}</div>

        </div>
    );
}

export default Home;