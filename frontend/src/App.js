import React from 'react'
import { Routes,Route } from 'react-router-dom'
import {Box} from '@mui/material';
import Train from './Components/Train';
import Trains from './Components/Trains';
import Navbar from './Components/Navbar';
const App = () => {
  return (

    <Routes>
    <Route path="/" element={<Navbar/>}/>
    <Route path='/train/:id' element={<Train/>}/>
    <Route path="/trains" element={<Trains/>}/>
    </Routes>
  )
}

export default App