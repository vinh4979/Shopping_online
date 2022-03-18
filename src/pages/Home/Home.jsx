import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import FilterPanel from 'src/components/FilterPanel/FilterPanel'
import SearchItemResult from 'src/components/SearchItemResult/SearchItemResult'
import useQuery from 'src/Hook/useQuery'
import { getCategories, getProducts } from './home.slice'
import * as S from './home.style'
import { Helmet } from 'react-helmet'

const Home = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState({
    products: [],
    pagination: {}
  }) // product chưa object chứ không phải array
  const [filters, setFilters] = useState({})
  const dispatch = useDispatch()
  const query = useQuery()

  // getCategory
  useEffect(() => {
    dispatch(getCategories())
      .then(unwrapResult)
      .then(res => {
        setCategories(res.data)
      })
  }, [dispatch])

  // getProducts
  useEffect(() => {
    const _filters = {
      ...query,
      page: query.page || 1,
      limit: query.limit || 30,
      sortBy: query.sortBy || 'view'
    }
    setFilters(_filters)
    const params = {
      page: _filters.page,
      limit: _filters.limit,
      category: _filters.category,
      exclude: _filters.exclude,
      rating_filter: _filters.rating,
      price_max: _filters.maxPrice,
      price_min: _filters.minPrice,
      sort_by: _filters.sortBy,
      order: _filters.order,
      name: _filters.name
    }
    const _getProducts = async () => {
      const data = await dispatch(getProducts({ params }))
      const res = unwrapResult(data)
      setProducts(res.data)
    }
    _getProducts()
  }, [query, dispatch])
  return (
    <div>
      <Helmet>
        <title>
          Shoppe việt Nam | Mua và bán trên ứng dụng di động hoặc website
        </title>
      </Helmet>
      <S.Container className="container">
        <S.Side>
          <FilterPanel categories={categories} filters={filters} />
        </S.Side>
        <S.Main>
          <SearchItemResult products={products} filters={filters} />
        </S.Main>
      </S.Container>
    </div>
  )
}

export default Home
