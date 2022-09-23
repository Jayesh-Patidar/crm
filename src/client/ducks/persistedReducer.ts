import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from './auth';
import { rootReducer } from './rootReducer';

/**
 * redux-persist config
 */
const persistConfig = {
    key: 'redux',
    storage,
    whitelist: ['auth'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
