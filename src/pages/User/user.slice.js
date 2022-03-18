import { createAsyncThunk } from '@reduxjs/toolkit'
import purchaseApi from 'src/api/purchase.api'
import { payLoadCreator } from 'src/utils/helper'

export const getPurchases = createAsyncThunk(
  'user/getPurchases',
  payLoadCreator(purchaseApi.getPurchases)
)
