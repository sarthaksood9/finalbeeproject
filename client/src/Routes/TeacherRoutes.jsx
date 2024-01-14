import React from 'react'
import Teacher from '../components/Teacher'
import { Route, Routes } from 'react-router-dom'

const TeacherRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Teacher/>}/>
    </Routes>
  )
}

export default TeacherRoutes