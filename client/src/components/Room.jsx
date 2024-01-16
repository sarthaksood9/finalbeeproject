import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer from "react-player"
import { useSocket } from '../context/SocketProvider'

import peer from "../services/peer"
import { useStore } from '../zustand/userstand'

const Room = () => {
  const user=useStore(state=> state);
  console.log(user.user.role);
  const socket = useSocket();
  const [remoteSocketid, setRemoteSocketid] = useState();
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [incomming,setIncomming]=useState(false);

  const hendleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setIncomming(email);
    setRemoteSocketid(id);
  })

  const hendleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketid, offer });
    setMyStream(stream);
  },[remoteSocketid, socket])
  

  const hendleIncoomingCall = useCallback(async ({ from, offer }) => {
    setRemoteSocketid(from);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    setIncomming(true);
    
    setMyStream(stream);
    console.log("incomming:call", from, offer);
    const ans = await peer.getAnswer(offer);


    socket.emit("call:accepted", { to: from, ans });
  }, [socket])

  const sendStreams=useCallback(()=>{
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);

    }
  },[myStream])

  // useEffect(()=>{
  //   if(incomming){
      
  //       for (const track of myStream.getTracks()) {
  //         peer.peer.addTrack(track, myStream);
    
  //       }
      
  //   }
  // },[incomming]);

  const hendleCallAccepted = useCallback(({ from, ans }) => {
    peer.setLocalDescription(ans);
    console.log("call Accepted!")
    sendStreams();
    

  }, [sendStreams])

  const hendleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketid });
  }, [remoteSocketid, socket])


  const hendleNegoIncomming = useCallback(async ({ from, offer }) => {
    const ans = await peer.getAnswer(offer);
    socket.emit("peer:nego:done", { to: from, ans })

  }, [socket])

  const hendleNegoFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  })

  useEffect(() => {
    peer.peer.addEventListener('negotiationneeded', hendleNegoNeeded)

    return () => {
      peer.peer.removeEventListener('negotiationneeded', hendleNegoNeeded)
    }
  }, [hendleNegoNeeded])



  useEffect(() => {
    peer.peer.addEventListener('track', async (ev) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    })
  })

  useEffect(() => {
    socket.on("user:Joind", hendleUserJoined);
    socket.on("incomming:call", hendleIncoomingCall);
    socket.on("call:accepted", hendleCallAccepted)
    socket.on("peer:nego:needed", hendleNegoIncomming)
    socket.on("peer:nego:final", hendleNegoFinal)

    return (() => {
      socket.off("user:Joind", hendleUserJoined);
      socket.off("incomming:call", hendleIncoomingCall);
      socket.off("call:accepted", hendleCallAccepted);
      socket.off("peer:nego:needed", hendleNegoIncomming)
      socket.off("peer:nego:final", hendleNegoFinal)
    })
  }, [socket, hendleUserJoined, hendleIncoomingCall, hendleCallAccepted,hendleNegoIncomming,hendleNegoFinal])
  return (
    <>
      <div>Room</div>
      {remoteSocketid ? <div>{incomming} is available for the call</div> : <div>No {user.user.role==="teacher"?<span>student</span>:<span>teacher</span>} is Available</div>}
      {myStream && <button className='bg-blue-400 px-4 py-1 text-white rounded-2xl' onClick={sendStreams}>connect</button>}
      {remoteSocketid && <button className='bg-blue-400 px-4 py-1 text-white rounded-2xl' onClick={hendleCallUser}>call</button>}
      {myStream && <ReactPlayer playing muted width="500px" height="300px" url={myStream}></ReactPlayer>}
      {remoteStream && <><h1>remote stream</h1><ReactPlayer playing muted width="500px" height="300px" url={remoteStream}></ReactPlayer></>}

    </>
  )
}

export default Room