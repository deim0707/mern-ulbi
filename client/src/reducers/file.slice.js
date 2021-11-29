import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ApiService from "../services/api.service";

export const NAME_FILE_STORE = 'file';


const initialState = {
    files: [],
    currentDirectory: null,
};

export const getFiles = createAsyncThunk(
    `${NAME_FILE_STORE}/getFiles`,
    async (directoryId) => ApiService.FileApi.getFiles(directoryId)
);

export const createDirectory = createAsyncThunk(
    `${NAME_FILE_STORE}/createDirectory`,
    async (directoryData) => ApiService.FileApi.createDirectory(directoryData)
);

const fileSlice = createSlice({
    name: NAME_FILE_STORE,
    initialState,
    reducers: {
        setCurrentDirectory: (state, {payload}) => {
            console.log({payload});
        },
        setFiles: (state, {payload}) => {
            console.log({payload});
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFiles.fulfilled,
            (state, {payload}) => {
                state.files = payload;
            })

        builder.addCase(createDirectory.fulfilled,
            (state, {payload}) => {
                state.files = [...state.files, payload];
            })
    }
});

export const {setCurrentDirectory, setFiles} = fileSlice.actions;

export const selectFiles = state => state[NAME_FILE_STORE].files;
export const selectCurrentDirectory = state => state[NAME_FILE_STORE].currentDirectory;

export default fileSlice.reducer;