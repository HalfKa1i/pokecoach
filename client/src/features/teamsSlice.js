import { createSlice } from '@reduxjs/toolkit'

export const teamsSlice = createSlice({
    name: 'teams',
    initialState: [],
    reducers: {
        teamsAdded(state, action) {
            action.payload.forEach(team => state.push(team));
        }
    },
})

// Action creators are generated for each case reducer function
export const { teamsAdded } = teamsSlice.actions

export default teamsSlice.reducer