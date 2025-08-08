import { configureStore } from "@reduxjs/toolkit";
import commonModalSlice from "./reducers/commonModalSlice"

const store = configureStore({
    reducer:{
        commonModalReducer : commonModalSlice,
    }
})

export default store