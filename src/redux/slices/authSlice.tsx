import { createSlice } from '@reduxjs/toolkit'
import { dispatch } from '../store'
// import * as services from '../../services/auth-service'
// import { setSession } from '../../utils/jwt'

// import API_URL from '../../utils/baseConfig/apiBase'
// import { getUserFromStorage } from '../../utils/userUtils'
import { UserLogin, Password, Email, AuthState } from '../../types/authType'
import {
  removeFromLocalStorage,
  setInLocalStorage,
  getFromLocalStorage,
} from '../../hooks/useLocalStorage'
// import ApiRouteconstant from '../../services/apiRouteconstant'
import { user } from '../../services/api/index'
// import { Password, UserLogin } from '../../types/authType'
import { localStorageVar } from '../../utils/constants'
import axios from 'axios'

// const { LOGIN, LOGOUT } = ApiRouteconstant
// const storedUser = getUserFromStorage()

const initialState: AuthState = {
  user: null,
  profile: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  isAuthenticated: false,
  message: '',
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true
      state.isAuthenticated = false
    },
    hasError(state, action) {
      state.isLoading = false
      state.isError = true
      state.isAuthenticated = false
      state.message = action.payload.data.message as string
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      // state.user = action.payload.data.token
      state.user = action.payload
      state.isAuthenticated = true
      state.message = action.payload.message
    },
    setPasswordSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    },
    forgotPasswordSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    },
    resetPasswordSuccess: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.message = action.payload.message as string
    },
    logOutSuccess: (state) => {
      state.isLoading = false
      state.user = null
      state.isAuthenticated = false
    },
  },
})

// reducers
export default userSlice.reducer

// actions
export const { startLoading, hasError } = userSlice.actions

// -----------------------------------------------------------------

export const login = (userData: UserLogin) => {
  dispatch(userSlice.actions.startLoading())
  return async () => {
    try {
      // const config = { headers: { 'Content-Type': 'application/json' } }
      const response = await user.login(userData)
      // if (response.data) {
      //   // setInLocalStorage(
      //   //   localStorageVar.USER_VAR,
      //   //   JSON.stringify(response.data)
      //   // )
      //   const token: any = response.data.data.token
      //   if (token) {
      //     setInLocalStorage(localStorageVar.TOKEN_VAR, token)
      //   }
      // }
      if (response) {
        // setInLocalStorage(
        //   localStorageVar.USER_VAR,
        //   JSON.stringify(response.data)
        // )
        const token: any = response.data.token
        if (token) {
          setInLocalStorage(localStorageVar.TOKEN_VAR, token)
        }
      }
      dispatch(userSlice.actions.loginSuccess(response))
      return response.data
    } catch (error) {
      console.log(error)
      dispatch(userSlice.actions.hasError(error))
    }
  }
}

export const logout = () => {
  dispatch(userSlice.actions.startLoading())
  return async () => {
    try {
      removeFromLocalStorage(localStorageVar.TOKEN_VAR)
      await user.logout()
      dispatch(userSlice.actions.logOutSuccess())
    } catch (error) {
      console.log(error)
      dispatch(userSlice.actions.hasError(error))
    }
  }
}
export const updatePassword = (passwordData: Password) => {
  dispatch(userSlice.actions.startLoading())
  return async () => {
    try {
      const response = await user.updatePassword(passwordData)
      dispatch(userSlice.actions.setPasswordSuccess(response.data))
      return response.data
    } catch (error) {
      dispatch(userSlice.actions.hasError(error))
    }
  }
}

export const forgotPassword = (userEmail: Email) => {
  dispatch(userSlice.actions.startLoading())
  return async () => {
    try {
      // const config = { headers: { 'Content-Type': 'application/json' } }
      const response = await user.forgotPassword(userEmail)
      dispatch(userSlice.actions.forgotPasswordSuccess(response.data))
      return response.data
    } catch (error) {
      dispatch(userSlice.actions.hasError(error))
    }
  }
}

export const resetPassword = (token: any, passwordData: Password) => {
  dispatch(userSlice.actions.startLoading())
  return async () => {
    try {
      // const { data } = await axios.put(
      //     `/api/v1/password/reset/${token}`,
      //     passwordData
      // )
      const { data } = await user.resetPassword(token, passwordData)
      dispatch(userSlice.actions.resetPasswordSuccess(data.success))
    } catch (error) {
      dispatch(userSlice.actions.hasError(error))
    }
  }
}

// const updatePassword = async (passwordData: Password) => {
//   try {
//     const response = await user.updatePassword(passwordData)
//     return response.data
//   } catch (error) {}
// }

// export const forgotPassword = async (userEmail: Email) => {
//   //   dispatch(userSlice.actions.startLoading())
//   try {
//     const config = { headers: { 'Content-Type': 'application/json' } }
//     const { data } = await API_URL.post(FORGOTPASSWORD, userEmail, config)
//     // const { data } = await axios.post(
//     //   `/api/v1/password/forgot`,
//     //   emailData,
//     //   config
//     // )

//     // dispatch(userSlice.actions.forgotPasswordSuccess(data))
//     return data.data
//   } catch (error) {
//     console.log(error)
//     // dispatch(userSlice.actions.hasError(error))
//   }
// }
