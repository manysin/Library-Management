import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './features/counter/counterSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterSlice.reducer,
        },
    })
}