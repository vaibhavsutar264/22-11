import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'

// slices
import authReducer from './slices/authSlice'

// =================================

const encryptor = encryptTransform({
  secretKey: '123456',
  onError: (err) => {
    console.log('err', err)
  },
})

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
  blacklist: [],
  transforms: [encryptor],
}

const authPersistConfig = {
  key: 'auth',
  storage,
  keyPrefix: 'redux-',
  // whitelist: ['sortBy', 'filters'],
  transforms: [encryptor],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  //auth: authReducer
})

export { rootPersistConfig, rootReducer }
