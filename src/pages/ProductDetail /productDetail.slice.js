import { createAsyncThunk } from '@reduxjs/toolkit'
import productApi from 'src/api/product.api'
import purchaseApi from 'src/api/purchase.api'
import { payLoadCreator } from 'src/utils/helper'

export const getProductDetail = createAsyncThunk(
  'productDetail/getProductDetail',
  payLoadCreator(productApi.getProductDetail)
)

export const addToCart = createAsyncThunk(
  'productDetail/addToCart',
  payLoadCreator(purchaseApi.addToCart)
)
