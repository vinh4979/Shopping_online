import React from 'react'
import 'normalize.css'
import 'src/assets/styles/global.scss'
import Routes from './Routes'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Authorization from './components/Authorization/Authorization'
import Loading from './components/Loading/Loading'

function App() {
  return (
    <div className="App">
      <Routes />
      <Loading />
      <ToastContainer />
      <Authorization />
    </div>
  )
}

export default App
