import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
// import Home from 'src/pages/Home/Home'
import { path } from 'src/constants/path'
import RegisterLayout from './Layouts/RegisterLayout/RegisterLayout'
import MainLayout from './Layouts/MainLayout/MainLayout'
import UnauthenticatedGuard from './Guard/UnauthenticatedGuard'
import AuthenticatedGuard from './Guard/AuthenticatedGuard'
import CartLayout from './Layouts/CartLayout/CartLayout'
import Fallback from './components/Fallback/Fallback'

const Home = lazy(() => import('src/pages/Home/Home'))
const ProductDetail = lazy(() => import('./pages/ProductDetail /ProductDetail'))
const User = lazy(() => import('./pages/User/User'))
const Cart = lazy(() => import('./pages/Cart/Cart'))
const Login = lazy(() => import('./pages/Auth/Login/Login'))
const Register = lazy(() => import('./pages/Auth/Register/Register'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

const Routes = () => {
  return (
    <Switch>
      <Route path={path.home} exact>
        <MainLayout>
          <Suspense fallback={<Fallback />}>
            <Home />
          </Suspense>
        </MainLayout>
      </Route>
      <Route path={path.productDetail} exact>
        <MainLayout>
          <Suspense fallback={<Fallback />}>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      </Route>
      <Route path={path.login}>
        <UnauthenticatedGuard>
          <RegisterLayout title="Đăng Nhập">
            <Suspense fallback={<Fallback />}>
              <Login />
            </Suspense>
          </RegisterLayout>
        </UnauthenticatedGuard>
      </Route>
      <Route path={path.register}>
        <UnauthenticatedGuard>
          <RegisterLayout title="Đăng ký">
            <Suspense fallback={<Fallback />}>
              <Register />
            </Suspense>
          </RegisterLayout>
        </UnauthenticatedGuard>
      </Route>
      <Route path={path.user}>
        <AuthenticatedGuard>
          <MainLayout>
            <Suspense fallback={<Fallback />}>
              <User />
            </Suspense>
          </MainLayout>
        </AuthenticatedGuard>
      </Route>
      <Route path={path.cart}>
        <AuthenticatedGuard>
          <CartLayout>
            <Suspense fallback={<Fallback />}>
              <Cart />
            </Suspense>
          </CartLayout>
        </AuthenticatedGuard>
      </Route>
      <Route path={path.notFound}>
        <Suspense fallback={<Fallback />}>
          <NotFound />
        </Suspense>
      </Route>
    </Switch>
  )
}

export default Routes
