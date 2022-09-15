import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './rootReducer';

/**
 * redux-persist config
 */
const persistConfig = {
    key: 'redux',
    storage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
