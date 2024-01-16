import React, { useCallback, useEffect, useState } from 'react'

import { useSocket } from '../context/SocketProvider';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../zustand/userstand'


const Techcallroom = () => {
    const user=useStore(state=> state);
    console.log(user.user.email)
    
    const [email, setEmail] = useState("saa");
    const [roomId, setRoomId] = useState(1);

    const socket =useSocket();

    const navigate =useNavigate();

    const hendleSubmit = useCallback((e) => {
        e.preventDefault();

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
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <video
                       
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>

                {/* Add UI elements for hang up, mute, etc., buttons as needed */}
                {/* For example, hang-up button */}
                <button onClick={hendleSubmit} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
                    Hang Up
                </button>
            </div>
        </div>
    )
}

export default Techcallroom