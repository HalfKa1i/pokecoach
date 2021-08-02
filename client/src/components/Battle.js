import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { pokemonAdded } from '../features/pokemonSlice'

import './Home.css';

const Battle = () => {
    useEffect(() => getOptions(), []);

    const pokemon = useSelector(state => state.pokemon)
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const dispatch = useDispatch()

    const getOptions = () => {
        fetch('/api/pokemon')
            .then(response => response.json())
            .then(data => {
                dispatch(
                    pokemonAdded(data)
                )
            });
    };

    const getPokemon = (data) => {
        if (data && data.value) {
            fetch(`/api/pokemon/${data.value}`)
                .then(response => response.json())
                .then(data => setSelectedPokemon(data));
        }
    };

    return (
        <div>
            <h2>Who are you battling?</h2>
            <Select options={pokemon} isClearable={true} isSearchable={true} placeholder="Search for Pokémon" onChange={getPokemon}/>

            <hr/>

            <div>{selectedPokemon && (
                <div>
                    <h3>{selectedPokemon.name}</h3>
                    <Image src={selectedPokemon.spriteUrl} fluid className="pokemon-sprite" />

                    <div>
                        {selectedPokemon.types.map((value) => {
                            return  <Badge pill variant="primary" className={value}>{value}</Badge>
                        })}
                    </div>

                    <br/>

                    <Card border="danger"  className="text-center">
                        <Card.Header>Weaknesses</Card.Header>
                        <Card.Body>
                            {selectedPokemon.weaknesses.map((value) => {
                                return  <Badge pill variant="primary" className={value}>{value}</Badge>
                            })}
                        </Card.Body>
                    </Card>
                </div>
            )}</div>

        </div>
    );
}

export default Battle;