import { createSlice, PayloadAction  } from '@reduxjs/toolkit'
import { Manager } from 'types'
import { RootState } from './store';

interface ManagerState {
    value: Manager | undefined;
}

const initialState: ManagerState = {
    value: undefined
};
const managerSlice = createSlice({
    name: 'manager',
    initialState,
    reducers: {
        setManager: (state, action: PayloadAction<Manager>) => {
            state.value = action.payload;
        },
    }
})

export const { setManager } = managerSlice.actions

export const selectManager = (state: RootState) => state.manager.value 

export default managerSlice.reducer;