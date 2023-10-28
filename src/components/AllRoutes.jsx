import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import AddBill from '../pages/AddBill'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='add-bill' element={<AddBill/>} />
    </Routes>
  )
}

export default AllRoutes