import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from 'react-redux'
import { teamAdded } from '../features/teamSlice';
import { pokemonAdded } from '../features/pokemonSlice';

import './Home.css';
import {useAuth0} from "@auth0/auth0-react";
const axios = require('axios').default;

const CreateTeam = () => {
    const { user, isAuthenticated} = useAuth0();
    const animatedComponents = makeAnimated();

    useEffect(() => getOptions(), []);

    const pokemon = useSelector(state => state.pokemon)
    const [selectedPokemon, setSelectedPokemon] = useState([]);

    const dispatch = useDispatch();

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

    const onChange = (data) => {
        setSelectedPokemon(data);
    }

    const createTeam = (selectedPokemon) => {
        const team = {
            owner: user.name,
            name: 'testing',
            pokemon: selectedPokemon
        }

        axios.post('/api/teams', team)
            .then(function (response) {
                dispatch(
                    teamAdded(team)
                )
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div>
            <h4>Team Creator</h4>
            <p>Select 6 pokemon</p>

            {pokemon && (
                <React.Fragment>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        onChange={onChange}
                        options={selectedPokemon.length === 6 ? [] : pokemon}
                    />

                    <br/>

                    <Button variant="success" onClick={() => createTeam(selectedPokemon)} disabled={selectedPokemon.length < 6}>Create</Button>
                </React.Fragment>
            )}
        </div>
    );
}

export default CreateTeam;