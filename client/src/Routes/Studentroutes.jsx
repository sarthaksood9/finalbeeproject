import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Student from '../components/Student'
import Room from '../components/Room'

const StudentsRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Student/>}/>
        {/* <Route path="/teachercall" element={<Techcallroom/>}/> */}
        <Route path='/room/:roomID' element={<Room/>}/>
    </Routes>
  )
}

export default StudentsRoutes