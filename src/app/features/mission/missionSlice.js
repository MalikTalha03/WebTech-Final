import  { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const missionapi = "https://api.spacexdata.com/v3/missions";

export const fetchMissions = createAsyncThunk(
    "mission/fetchMissions",
    async () => {
        const response = await axios.get(missionapi);
        return response.data;
    }
    );


const missionSlice = createSlice({
    name: "mission",
    initialState: {
        missions: [],
        loading: false,
        error: null,
        reserved: []
    },
    reducers: {
        joinMission: (state, action) => {
            console.log("joinMission")
            const missionId = action.payload;
            state.reserved.push(missionId);
            const mission = state.missions.map((mission) => {
                console.log(mission.reserved)
                if (mission.mission_id === missionId) {
                    return {
                        ...mission,
                        reserved: true,
                    };
                }
                return mission;
            })
        },
        leaveMission: (state, action) => {

            const missionId = action.payload;
            state.reserved = state.reserved.filter((id) => id !== missionId);
            const mission = state.missions.map((mission) => {
                if (mission.mission_id === missionId) {
                    return {
                        ...mission,
                        reserved: false,
                    };
                }
                return mission;
            })
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchMissions.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchMissions.fulfilled, (state, action) => {
            state.loading = false;
            state.missions = action.payload;
        });
        builder.addCase(fetchMissions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default missionSlice.reducer;

export const { joinMission, leaveMission } = missionSlice.actions;