import { createAsyncThunk } from '@reduxjs/toolkit'
import categoryApi from 'src/api/category.api'
import productApi from 'src/api/product.api'
import { payLoadCreator } from 'src/utils/helper'

export const getCategories = createAsyncThunk(
  'home/getCategories',
  payLoadCreator(categoryApi.getCategories)
)

// chỉ sử dụng trong component nên không lưu trong redux
export const getProducts = createAsyncThunk(
  'home/getProducts',
  payLoadCreator(productApi.getProducts)
)
