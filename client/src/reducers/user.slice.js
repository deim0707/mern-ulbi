import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ApiService from "../services/api.service";
import {removeToken, setToken} from "../shared/localStorageUtils";

const NAME_STORE = 'user';

const initialState = {
    currentUser: {},
    isAuthorizationUser: false,
}

export const getUserOnLogin = createAsyncThunk(
    `${NAME_STORE}/getUserOnLogin`,
    async (user) => ApiService.UserApi.login(user)
);

export const getUserOnAuthorization = createAsyncThunk(
    `${NAME_STORE}/getUserOnAuthorization`,
    async () => ApiService.UserApi.authorization()
);

const userSlice = createSlice({
    name: NAME_STORE,
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = {};
            state.isAuthorizationUser = false;
            removeToken();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserOnAuthorization.fulfilled,
            (state, {payload}) => {
                state.currentUser = payload.user;
                setToken(payload.token)
                state.isAuthorizationUser = Boolean(payload.token);
            })
        builder.addCase(getUserOnAuthorization.rejected,
            () => {
                // если не вышло авторизовать по токену. то удаляем его
                removeToken();
            });
        builder.addCase(getUserOnLogin.fulfilled,
            (state, {payload}) => {
                state.currentUser = payload.user;
                setToken(payload.token)
                state.isAuthorizationUser = Boolean(payload.token);
            });
        // builder.addCase(getUser.pending,
        //     (state, payload) => {});
        // builder.addCase(getUser.rejected,
        //     (state, payload) => {});
    }
});

export const {logout} = userSlice.actions;

export const selectIsAuthorizationUser = state => state[NAME_STORE].isAuthorizationUser;
export const selectCurrentUser = state => state.currentUser;

export default userSlice.reducer;