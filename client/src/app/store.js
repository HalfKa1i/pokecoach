import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from '../features/pokemonSlice';
import teamsReducer from "../features/teamsSlice";
import teamReducer from "../features/teamSlice";

export default configureStore({
    reducer: {
        pokemon: pokemonReducer,
        teams: teamsReducer,
        team: teamReducer
    },
})