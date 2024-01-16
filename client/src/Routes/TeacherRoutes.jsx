import React from 'react'
import Teacher from '../components/Teacher'
import { Route, Routes } from 'react-router-dom'
import Techcallroom from '../components/Techcallroom'
import Room from '../components/Room'


const TeacherRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Teacher/>}/>
        <Route path="/teachercall" element={<Techcallroom/>}/>
        <Route path='/room/:roomID' element={<Room/>}/>
    </Routes>
    </>
  )
}

export default TeacherRoutes