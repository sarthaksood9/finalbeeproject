import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Student from '../components/Student'

const StudentsRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Student/>}/>

        
    </Routes>
  )
}

export default StudentsRoutes