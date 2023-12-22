import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipeReducer from './recipes/recipesSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
// import { thunk } from "redux-thunk";

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const reducer = combineReducers({
    recipes: recipeReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: true
});

export const persistor = persistStore(store);