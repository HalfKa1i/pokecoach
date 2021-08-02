import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux'
import {useAuth0} from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

import { teamsAdded } from '../features/teamsSlice';
import { teamAdded } from '../features/teamSlice';
import './Home.css';
import {pokemonAdded} from "../features/pokemonSlice";

const axios = require('axios').default;

const Team = () => {
    const { user } = useAuth0();
    useEffect(() => getTeams(), []);

    const teams = useSelector(state => state.teams)
    const [options, setOptions] = useState(null);
    const [team, setTeam] = useState(null);

    const dispatch = useDispatch()

    const getTeams = () => {
        axios.get(`/api/teams/owned/${user.name}`)
            .then(function (response) {
                dispatch(
                    teamsAdded(response.data)
                )

                formatOptions(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };

    const getTeam = (data) => {
        if (data && data.value) {
            const currentTeam = teams.filter(function(x) { return x.id === data.value; }).reduce((x) => x.pokemon);
            const pokemon = JSON.parse(currentTeam.pokemon);
            let listOfPokemon = [];

            pokemon.forEach(p => {
                axios.get(`/api/pokemon/${p.value}`)
                    .then(function (response) {
                        listOfPokemon.push(response.data);
                    })
                    .then(function(response) {
                        dispatch(teamAdded(listOfPokemon));
                        setTeam(listOfPokemon);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    });
            });
        }
    };

    const formatOptions = (teams) => {
        const options = [];

        teams.forEach(team => {
            options.push({value: team.id, label: team.name})
        })

        setOptions(options);
    }

    return (
        <div>
            <h4>Team</h4>
            {teams && (
                <Select options={options} isClearable={true} isSearchable={true} placeholder="Search for Pokémon" onChange={getTeam}/>
            )}
            <br/>

            <Button variant="outline-primary" href="createTeam">Create team</Button>

            <hr/>

            {team && (
                <div>
                    there's a team coming soon
                </div>
            )}
        </div>
    );
}

const PokemonDetail = (selectedPokemon) => {
    // {team.map((selectedPokemon) => {
    //     return <PokemonDetail selectedPokemon={selectedPokemon}/>
    // })}

    return (
         <React.Fragment>
            {selectedPokemon && (
                <div key={selectedPokemon.name}>
                    <h3>{selectedPokemon.name}</h3>
                    <Image src={selectedPokemon.spriteUrl} fluid className="pokemon-sprite" />

                    <div>
                        {selectedPokemon.types.map((value) => {
                            return  <Badge pill variant="primary" key={value} className={value}>{value}</Badge>
                        })}
                    </div>

                    <br/>

                    <Card border="danger"  className="text-center">
                        <Card.Header>Weaknesses</Card.Header>
                        <Card.Body>
                            {selectedPokemon.weaknesses.map((value) => {
                                return  <Badge pill variant="primary" key={value} className={value}>{value}</Badge>
                            })}
                        </Card.Body>
                    </Card>
                </div>
            )}
        </React.Fragment>
    );
}

export default Team;