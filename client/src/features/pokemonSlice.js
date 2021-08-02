import { createSlice } from '@reduxjs/toolkit'

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: [],
    reducers: {
        pokemonAdded(state, action) {
            action.payload.forEach(pokemon => state.push(pokemon));
        }
    },
})

// Action creators are generated for each case reducer function
export const { pokemonAdded } = pokemonSlice.actions

export default pokemonSlice.reducer