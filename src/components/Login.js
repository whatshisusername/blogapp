import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // this we using from our react hook form
    // here register and handlesubmit are two functions coming from useFrom
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    // this on clicking our login button in the login page
    // this data is coming with help of handlesubmit ,data is email and password
    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div>
          <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            {/* this div is our logo */}
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Login in to your account</h2>
{/* if no account sign up here */}
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {/* this displays if any error comes up */}
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        {/* start out form input email and password and login button */}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                {/* using our Input.js component  for email*/}
                <Input 

                label="Email: "
                placeholder="Enter your email"
                type="email"
                // this register using we useform function
                // register takes key email and stores email in it
                // it also takes other attribute as required email or validate ie check 

                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />

                

                {/* using Input.js component for password */}
                <Input
                label="Password: "
                placeholder="Enter your password"
                type="password"
                // this register using we useform function
                // register takes key email and stores email in it
                // it also takes other attribute as required email or validate ie check 

                {...register("password", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ||
                        "password must be a valid address",
                    }
                })}/>
                
                {/* this is not our Button.js component this is normal html button */}
                <Button
                type="submit"
                className="w-full"
                >Log in</Button>









            </div>



        </form>



     </div>
    </div>
  )
}

export default Login