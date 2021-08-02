import { createSlice } from '@reduxjs/toolkit'

export const teamSlice = createSlice({
    name: 'team',
    initialState: [],
    reducers: {
        teamAdded(state, action) {
            action.payload.forEach(pokemon => state.push(pokemon));
        }
    },
})

// Action creators are generated for each case reducer function
export const { teamAdded } = teamSlice.actions

export default teamSlice.reducer