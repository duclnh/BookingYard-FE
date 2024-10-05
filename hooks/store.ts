import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userStore';
import managerReducer from './managerStore';
import bookingReducer from './bookingStore'
export const store = configureStore({
    reducer: {
        user: userReducer,
        manager: managerReducer,
        booking: bookingReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store