import { persistStore } from 'redux-persist';
import { createWrapper } from 'next-redux-wrapper';
import { persistedReducer } from './persistedReducer';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
    ],
});

export const persistedStore = persistStore(store);

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
