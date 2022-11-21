// import { types } from "mobx-state-tree"

// export const Password = types.model({
//   password: types.optional(types.string, ""),
// })

export type AuthState = {
  user: null | AuthUser
  profile: Profile | undefined
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  isAuthenticated: boolean
  message: string | undefined
}

export type AuthUser = {
  token: string
  user: {
    firstName: string
    lastName: string
    role: 'admin' | 'user'
  }
}

export type UserData = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password?: string
  address?: string
}

export type UserLogin = {
  email?: string
  password?: string
  confirmPassword?: string
}

export type Profile = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
}

export type Password = {
  password?: string
  confirmPassword?: string
}

export type Email = {
  email?: string
}
