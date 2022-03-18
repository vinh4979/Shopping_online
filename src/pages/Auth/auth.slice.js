import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from 'src/api/auth.api'
import userApi from 'src/api/user.api'
import LocalStorage from 'src/constants/localStorage'
import { payLoadCreator } from 'src/utils/helper'

// call api
export const register = createAsyncThunk(
  'auth/register',
  payLoadCreator(authApi.register)
)
export const login = createAsyncThunk(
  'auth/login',
  payLoadCreator(authApi.login)
)
export const logout = createAsyncThunk(
  'auth/logout',
  payLoadCreator(authApi.logout)
)
export const updateMe = createAsyncThunk(
  'auth/updateMe',
  payLoadCreator(userApi.updateMe)
)

//extrareducer
const handleAuthFullfilled = (state, action) => {
  const { user, access_token } = action.payload.data
  state.profile = user
  localStorage.setItem(LocalStorage.user, JSON.stringify(state.profile))
  localStorage.setItem(LocalStorage.accessToken, access_token)
}

const handleUnuath = state => {
  state.profile = {}
  localStorage.removeItem(LocalStorage.user)
  localStorage.removeItem(LocalStorage.accessToken)
}

const auth = createSlice({
  name: 'auth',
  initialState: {
    profile: JSON.parse(localStorage.getItem(LocalStorage.user)) || {}
  },
  reducers: {
    unauthorize: handleUnuath
  },
  extraReducers: {
    [register.fulfilled]: handleAuthFullfilled,
    [login.fulfilled]: handleAuthFullfilled,
    [logout.fulfilled]: handleUnuath,
    [updateMe.fulfilled]: (state, action) => {
      state.profile = action.payload.data
      localStorage.setItem(LocalStorage.user, JSON.stringify(state.profile))
    }
  }
})

const authReducer = auth.reducer
export const unauthorize = auth.actions.unauthorize
export default authReducer
