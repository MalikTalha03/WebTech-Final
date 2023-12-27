import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const dragonapi = "https://api.spacexdata.com/v4/dragons";

export const fetchDragons = createAsyncThunk(
    "dragon/fetchDragons",
    async () => {
        const response = await axios.get(dragonapi);
        return response.data;
    }
    );

const dragonSlice = createSlice({
    name: "dragon",
    initialState: {
        dragons: [],
        loading: false,
        error: null,
        reserved: []
    },
    reducers: {
        joinDragon: (state, action) => {
            const dragonId = action.payload;
            state.reserved.push(dragonId);
            const dragons = state.dragons.map((dragon) => {
                if (dragon.id === dragonId) {
                    return {
                        ...dragon,
                        reserved: true,
                    };
                }
                return dragon;
            })
            console.log("Join Dragon - Updated State:", state);
        },
        leaveDragon: (state, action) => {
            const dragonId = action.payload;
            state.reserved = state.reserved.filter((id) => id !== dragonId);
            const dragons = state.dragons.map((dragon) => {
                if (dragon.id === dragonId) {
                    return {
                        ...dragon,
                        reserved: false,
                    };
                }
                return dragon;
            })
            
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchDragons.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchDragons.fulfilled, (state, action) => {
            state.loading = false;
            state.dragons = action.payload;
        });
        builder.addCase(fetchDragons.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default dragonSlice.reducer;

export const { joinDragon, leaveDragon } = dragonSlice.actions;
