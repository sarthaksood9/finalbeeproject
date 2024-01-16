import React, { useCallback, useEffect, useState } from 'react'
import { useStore } from '../zustand/userstand'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketProvider';


const NavBar = () => {

    const navigate = useNavigate();


    const user = useStore(state => state);
    const [email, setEmail] = useState(user.user.email);
    const [roomId, setRoomId] = useState(1);

    const socket =useSocket();

    

    const hendleSubmit = useCallback(() => {
        

        socket.emit("room:join",{email,roomId})

    }, [email,roomId,socket])

    const hendleJoinRoom=useCallback((data)=>{
        const {email,roomId}=data;
        navigate(`/room/${roomId}`)
    },[navigate])

    

    useEffect(()=>{
        socket.on("room:join",hendleJoinRoom);
        return(()=>{
            socket.off("room:join",hendleJoinRoom);
        })
    },[hendleSubmit])

    const logout = () => {
        user.clearUser();
        navigate("/re");
        console.log("loged out")

    }
    console.log(user.user)
    return (
        <div>
            <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <div className='flex items-center gap-12'>
                    <div>
                        <h1 className='text-[2rem]'>Lms Project</h1>
                    </div>
                    <div className="flex mt-1">
                        <a onClick={()=>{user.user.role==="student"?hendleSubmit():navigate("/teachercall")}} className="mr-4 hover:underline">call</a>
                        <a href="#" className="mr-4 hover:underline">Catalog</a>
                        <a href="#" className="mr-4 hover:underline">Business</a>
                        <a href="#" className="hover:underline">Government</a>
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="relative mr-8 flax gap-2 ">
                        <span>Hi,&nbsp;</span>
                        {user.user && <span>{user.user.name}</span>}

                    <button onClick={logout} className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition duration-300">Log Out</button>
                    </div>
                    {/* <button className="bg-blue-500 text-white border border-blue-500 px-4 py-2 rounded-full ml-4 hover:bg-white hover:text-blue-500 transition duration-300">Join for Free</button> */}
                </div>
            </nav>

        </div>
    )
}

export default NavBar