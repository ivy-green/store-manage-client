import {configureStore} from "@reduxjs/toolkit";
import displaySlice from "../features/Display/displaySlice";
import consumerSlice from "../features/consumer/consumerSlice";
import tableSlice from "../features/table/tableSlice";
import searchSlice from "../features/search/searchSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const userInfoFromStorage =
    typeof window !== "undefined" && sessionStorage.getItem("user_payload")
        ? JSON.parse(sessionStorage.getItem("user_payload"))
        : {};

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
};

const store = configureStore({
    reducer: {
        display: displaySlice.reducer,
        table: tableSlice.reducer,
        search: searchSlice.reducer,
        initialState,
        consumer: consumerSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;
