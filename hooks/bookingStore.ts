import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Booking } from 'types'
import { RootState } from './store';

interface BookingState {
    value: Booking | undefined;
}

const initialState: BookingState = {
    value: undefined
};
const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBooking: (state, action: PayloadAction<Booking>) => {
            state.value = action.payload;
        },
        setEmptyBooking: (state) => {
            state.value = undefined;
        },
    }
})

export const { setBooking, setEmptyBooking } = bookingSlice.actions

export const selector = (state: RootState) => state.booking.value

export default bookingSlice.reducer;