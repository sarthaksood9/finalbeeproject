import React, { useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast';
import {useStore} from "../zustand/userstand.js"
import { useNavigate } from 'react-router-dom';



export const SignUp = () => {

    const user=useStore((state) => state)
    console.log(user)
    const [name, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("teacher");
    const [loader, setLoader] = useState(false);

    const navigate =useNavigate();


    const hendleEmailCheck = async (email) => {
        try {
            setLoader(true);

            const response = await axios.get(`http://localhost:4000/checkemail?email=${email}`);
            console.log(response.data);
            return response.data.exist;

        }
        catch (e) {
            console.log(e);
        }
        finally {
            setLoader(false);
        }
    }

    const hendleSubmit = async (name, email, password, role) => {
        setLoader(true);

        const check = await hendleEmailCheck(email);

        if (!check) {
            var obj = { name, email, password, role };
            axios.post("http://localhost:4000/signup", obj,{
                withCredentials:true
            })
                .then((req,res) => {
                    console.log("data sent")
                    user.setUser(req.data.users);
                    navigate("/");

    
                    
                })
                .catch((e) => {
                    console.log(e);
                })
        }
        else {
            console.log("email already exist");
            toast.error("email exist");
            
        }

        



    }

    console.log(user.user);


    return (
        <div className='py-[2rem] px-[4rem] flex flex-col items-center gap-5 pb-[3rem] '>
            <div className='text-[2.9rem] font-[500]'>
                <h1>Create your account.</h1>
            </div>
            <div className='w-[70%]'>
                <h3>Build skills for today, tomorrow, and beyond.
                    Education to future-proof your career.
                </h3>
            </div>
            <div className='flex flex-col gap-6 w-full'>
                <input value={name} onChange={(e) => { setFirstName(e.target.value) }} className='w-full h-8 border-[1px] rounded-xl px-3 py-5 text-[#455c8a]' type="text" placeholder='Name' id='name' />

                <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='w-full h-8 border-[1px] rounded-xl px-3 py-5' type="text" placeholder='Email' id='email' />

                <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='w-full h-8 border-[1px] rounded-xl px-3 py-5' type="text" placeholder='Enter Password' id='password' />
                <label>Sign Up As..</label>
                <select value={role} onChange={(e) => { setRole(e.target.value) }} placeholder="slecet role" id="role" name="role" class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500">
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                </select>

                <button onClick={() => {
                    hendleSubmit(name, email, password, role);
                }} className='w-[80%] self-center py-2 text-white border-[2px] rounded-xl bg-[#4f49c7]'>Sign Up</button>


            </div>
        </div>
    )
}

export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className='py-[2rem] px-[4rem] flex flex-col items-center gap-5 pb-[3rem] '>
            <div className='text-[2.9rem] font-[500]'>
                <h1>Create your account.</h1>
            </div>
            <div className='w-[70%]'>
                <h3>Build skills for today, tomorrow, and beyond.
                    Education to future-proof your career.
                </h3>
            </div>
            <div className='flex flex-col gap-6 w-full'>

                <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='w-full h-8 border-[1px] rounded-xl px-3 py-5' type="text" placeholder='Email' id='email' />

                <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='w-full h-8 border-[1px] rounded-xl px-3 py-5' type="text" placeholder='Enter Password' id='password' />



                <button className='w-[80%] self-center py-2 text-white border-[2px] rounded-xl bg-[#4f49c7]'>Sign In</button>


            </div>
        </div>
    )
}

const Registration = () => {
    const [login, setLogin] = useState(true);

    return (
        <div className='w-full py-[10rem] flex bg-[#F6F6F6] justify-center items-center'>
            <div className='w-full bg-[#ffffff] px-[3rem] py-[2.2rem] h-fit flex items-start absolute top-0'>
                <h1 className='text-[2rem]'>Lms Project</h1>
            </div>


            <div className='w-[50%] h-fit bg-white'>
                <div className='w-full flex cursor-pointer'>
                    <div className={`w-[50%] text-[1.3rem] py-[1rem] h-fit ${login ? "bg-[#F6F6F6]" : "bg-white"}`} onClick={() => { setLogin(!login) }}>
                        <h1>Signup</h1>
                    </div>
                    <div className={`w-[50%] text-[1.3rem] py-[1rem] h-fit ${!login ? "bg-[#F6F6F6]" : "bg-white"}`} onClick={() => { setLogin(!login) }}>
                        <h1>SignIn</h1>
                    </div>
                </div>
                {login ? <SignIn /> : <SignUp />}

            </div>

        </div>
    )
}

export default Registration