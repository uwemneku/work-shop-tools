import {configureStore} from '@reduxjs/toolkit'
import borrowerReducer from './Slice/borrowerSlice'
export const store = configureStore({
    reducer: {
        borrowerInfo: borrowerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch