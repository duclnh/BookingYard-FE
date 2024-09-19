import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userStore';
import managerReducer from './managerStore';

export const store = configureStore({
    reducer: {
        user: userReducer,
        manager: managerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store