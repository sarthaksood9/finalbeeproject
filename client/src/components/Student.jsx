import axios from 'axios'
import React from 'react'
import { useStore } from '../zustand/userstand'

const Student = () => {
  const user=useStore((state) => state)
  const hendleLogout=()=>{
    axios.get("http://localhost:4000/logout")
    .then((res)=>{
      console.log(res.status);
      user.clearUser();
      console.log("logout")
    })
    .catch((e)=>{
      console.log(e);
    })
    console.log("hi");
    console.log(user.user)
  }
  return (
    <div>
      <h1>Student</h1>
      <button onClick={()=>{hendleLogout()}}>logout</button>
    </div>
  )
}

export default Student