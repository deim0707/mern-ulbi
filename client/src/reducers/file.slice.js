import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ApiService from "../services/api.service";

export const NAME_FILE_STORE = 'file';


const initialState = {
    files: [],
    currentDirectory: null,
    // массив с открытыми папками
    directoryStack: [{path: '/', breadcrumbName: 'Cloud', id: null}]
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
        setFiles: (state, {payload}) => {
            console.log({payload});
        },
        pushDirectoryStack: (state, {payload}) => {
            state.directoryStack = [...state.directoryStack, payload];
            state.currentDirectory = payload.id;
        },
        popDirectoryStack: (state) => {
            state.directoryStack = state.directoryStack.filter((_, index) => index !== state.directoryStack.length-1)
            state.currentDirectory = state.directoryStack[state.directoryStack.length - 1].id;
        },
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

export const {setCurrentDirectory, setFiles, pushDirectoryStack, popDirectoryStack} = fileSlice.actions;

export const selectFiles = state => state[NAME_FILE_STORE].files;
export const selectCurrentDirectory = state => state[NAME_FILE_STORE].currentDirectory;
export const selectDirectoryStack = state => state[NAME_FILE_STORE].directoryStack;

export default fileSlice.reducer;