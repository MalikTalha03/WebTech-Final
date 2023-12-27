import { configureStore } from '@reduxjs/toolkit';
import dragonSlice from './features/dragons/dragonSlice';
import missionSlice from './features/mission/missionSlice';

export const store = configureStore({
    reducer: {
        dragon: dragonSlice,
        mission: missionSlice,
        },
    });

