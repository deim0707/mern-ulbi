import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from "./reducers/user.slice";
import fileReducer from "./reducers/file.slice";

const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
})