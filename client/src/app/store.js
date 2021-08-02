import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from '../features/pokemonSlice';

export default configureStore({
    reducer: {
        pokemon: pokemonReducer
    },
})