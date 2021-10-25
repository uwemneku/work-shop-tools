import { BorrowInfoType } from './../types/BorrowInfo';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: BorrowInfoType[]  = [];

export const borrowerSlice = createSlice({
    name: 'borrowerInfo',
    initialState,
    reducers:{
        addBorrower: (state, action: PayloadAction<BorrowInfoType>) => {
            state.unshift(action.payload)
        }
    }
})

export const {addBorrower} = borrowerSlice.actions

export default borrowerSlice.reducer