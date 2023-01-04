import rootReducer from "./reducer";
import {configureStore, PreloadedState} from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: rootReducer
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

