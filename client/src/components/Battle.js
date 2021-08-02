import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { pokemonAdded } from '../features/pokemonSlice'

import './Home.css';
const axios = require('axios').default;

const Battle = () => {
    useEffect(() => getOptions(), []);

    const pokemon = useSelector(state => state.pokemon)
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const dispatch = useDispatch()

    const getOptions = () => {
        axios.get('/api/pokemon')
            .then(function (response) {
                dispatch(
                    pokemonAdded(response.data)
                )
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };

    const getPokemon = (data) => {
        if (data && data.value) {
            axios.get(`/api/pokemon/${data.value}`)
                .then(function (response) {
                    setSelectedPokemon(response.data)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }
    };

    return (
        <div>
            <h4>Who are you battling?</h4>
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