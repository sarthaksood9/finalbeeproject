import React, { useState } from 'react'



export const SignUp = () => {
    const [firstName, setFirstName] = useState("");
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
                <input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} className='w-full h-8 border-[1px] rounded-xl px-3 py-5 text-[#455c8a]' type="text" placeholder='Name' id='name' />

                <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='w-full h-8 border-[1px] rounded-xl px-3 py-5' type="text" placeholder='Email' id='email' />

                <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='w-full h-8 border-[1px] rounded-xl px-3 py-5' type="text" placeholder='Enter Password' id='password' />


                <button className='w-[80%] self-center py-2 text-white border-[2px] rounded-xl bg-[#4f49c7]'>Sign Up</button>


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
    const[login,setLogin]=useState(true);

    return (
        <div className='w-full py-[10rem] flex bg-[#F6F6F6] justify-center items-center'>
            <div className='w-full bg-[#ffffff] px-[3rem] py-[2.2rem] h-fit flex items-start absolute top-0'>
                <h1 className='text-[2rem]'>Lms Project</h1>
            </div>


            <div className='w-[50%] h-fit bg-white'>
                <div className='w-full flex cursor-pointer'>
                    <div className={`w-[50%] text-[1.3rem] py-[1rem] h-fit ${login? "bg-[#F6F6F6]":"bg-white"}`} onClick={()=>{setLogin(!login)}}>
                        <h1>Signup</h1>
                    </div>
                    <div className={`w-[50%] text-[1.3rem] py-[1rem] h-fit ${!login? "bg-[#F6F6F6]":"bg-white"}`} onClick={()=>{setLogin(!login)}}>
                        <h1>SignIn</h1>
                    </div>
                </div>
                {login ? <SignIn/>:<SignUp/>}
                
            </div>

        </div>
    )
}

export default Registration