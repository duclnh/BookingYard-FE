import { createSlice, PayloadAction  } from '@reduxjs/toolkit'
import { User } from 'types'
import { RootState } from './store';

interface UserState {
    value: User | undefined;
}

const initialState: UserState = {
    value: undefined
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.value = action.payload;
        },
    }
})

export const { setUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user.value 

export default userSlice.reducer;