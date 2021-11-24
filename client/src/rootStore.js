import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer, {NAME_USER_STORE} from "./reducers/user.slice";
import fileReducer, {NAME_FILE_STORE} from "./reducers/file.slice";

const rootReducer = combineReducers({
    [NAME_USER_STORE]: userReducer,
    [NAME_FILE_STORE]: fileReducer
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
})