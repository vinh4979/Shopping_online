import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import purchaseApi from 'src/api/purchase.api'
import { payLoadCreator } from 'src/utils/helper'
import { logout } from '../Auth/auth.slice'

export const getCartPurchases = createAsyncThunk(
  'cart/getCartPurchases',
  payLoadCreator(purchaseApi.getCartPurchases)
)
export const updatePurchase = createAsyncThunk(
  'cart/updatePurchase',
  payLoadCreator(purchaseApi.updatePurchase)
)
export const deletePurchases = createAsyncThunk(
  'cart/deletePurchases',
  payLoadCreator(purchaseApi.deletePurchases)
)
export const buyPurchases = createAsyncThunk(
  'cart/buyPurchases',
  payLoadCreator(purchaseApi.buyPurchases)
)

const cart = createSlice({
  name: 'cart',
  initialState: {
    purchases: []
  },
  extraReducers: {
    [getCartPurchases.fulfilled]: (state, action) => {
      state.purchases = action.payload.data
    },
    [logout.fulfilled]: state => {
      state.purchases = []
    }
  }
})

const cartReducer = cart.reducer
export default cartReducer
