import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration';
import toast, { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom"

import { useStore } from "./zustand/userstand.js"
import StudentsRoutes from './Routes/Studentroutes';
import TeacherRoutes from './Routes/TeacherRoutes';


function App() {
  let { user } = useStore(state => state);
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={user.role==="student"?<StudentsRoutes/>:<TeacherRoutes/>} />
      <Route path='/re' element={<Registration/>}/>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
