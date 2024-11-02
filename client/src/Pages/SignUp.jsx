import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading';
import Input from '../Components/Input';

function SignUp() {
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const [success,setSuccess] = useState(false);
  const {register, handleSubmit, formState:{errors},watch,}=useForm({
    defaultValues:{
        name:"",
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
        type:"",
    }
})
  const signup=async(data)=>{
    console.log("signup",data);
    setError("");
    setLoading(true);
    ///
    setLoading(false);
  }
  if(loading){
    return <Loading/>
  }
  return (
    <>
      <div className='min-h-screen mx-auto mt-4 flex justify-center items-center'>
        <div className='border bg-slate-50 dark:bg-gray-900 border-blue-400 dark:border-slate-500 rounded-lg '>
        <form onSubmit={handleSubmit(signup)} className='pt-6 pb-2 px-4 flex flex-col justify-center items-center'>
                <h1 className='dark:text-gray-300 text-darken text-xl font-bold text-center text-gray-900'>Sign Up</h1>
            <div className='flex flex-col pt-6'>
            <div>
                <Input label={"Name"} placeholder={"Enter your name..."} {...register("name",{
                    required: "Name is required!",
                })}/>
                {errors && errors?.name && errors.name?.message.length>0 && <p className=' mb-2 text-center text-md text-red-600'>{errors.name.message}</p>}
            </div>
            <div>
                <Input label={"User name"} placeholder={"Enter your username..."} {...register("username",{
                    required: "Username is required!",
                })}/>
                {errors && errors?.username && errors.username?.message.length>0 && <p className=' mb-2 text-center text-md text-red-600'>{errors.username.message}</p>}
            </div>
            <div>
                <Input label={"Email"} placeholder={"Enter your email..."} {...register("email",{
                    required: "Email is required!",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                    },
                })}/>
                {errors && errors?.email && errors.email?.message.length>0 && <p className=' mb-2 text-center text-md text-red-600'>{errors.email.message}</p>}
            </div>
            <div className='flex justify-between items-center  w-full mb-2'>
                            <label htmlFor="type" className="block mx-2 text-gray-900 dark:text-gray-400 text-md font-bold text-nowrap">User: </label>
                            <select
                                id="type"
                                {...register('type',{
                                    required:"User type is Required!",
                                })}
                                className='cursor-pointer py-2 px-3 shadow outline-none text-black dark:text-gray-200 dark:bg-gray-950  dark:border-neutral-800 border border-gray-300 rounded '
                            >
                                <option value="student" >Student</option>
                                <option value="merchant">Merchant</option>
                            </select>
                        </div>
                        {errors && errors?.type && errors.type?.message.length>0 && <p className=' mb-2 text-center text-md text-red-600'>{errors.type.message}</p>}
            <div>
            <Input label={"Password"} type="password" placeholder={"Your password..."} {...register("password", {
                        required: "Password is required",
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.",
                        },
                    })}/>
            {errors && errors?.password && errors.password?.message.length>0 && <p className=' mb-2 text-center text-md text-red-600'>{errors.password.message}</p>}
            </div>
            <div>
            <Input label={"Confirm Password"} type="password" placeholder={"Confirm password..."} {...register("confirmpassword", { 
                            required: "Confirm Password is required", 
                            validate: (value) => value === watch("password") || "Passwords do not match"
                        })}/>
            {errors && errors?.confirmpassword && errors.confirmpassword?.message.length>0 && <p className=' mb-2 text-center text-md text-red-600'>{errors.confirmpassword.message}</p>}
            </div>
            </div>
            <div>
            <button className="mt-4 dark:hover:bg-gray-900 dark:bg-gray-950 bg-blue-500 w-fit hover:bg-blue-700 text-white font-bold 
            py-1 px-4 border dark:border-neutral-800 dark:hover:border-black border-blue-700 rounded text-md" type='submit'>
                SignUp
            </button>
        </div>
            </form>
          {error.length > 0 && <p className=' my-2 text-center text-md text-red-600 '>{error}</p>}
          {success.length > 0 && <p className=' my-2 text-center text-md font-bold text-blue-600 '>Successful! </p>}
          <p className='px-4 pb-3 dark:text-gray-400 text-gray-900'>Already have an account? <Link to={"/"}><span className='text-blue-700 dark:text-blue-600 rounded-lg px-3 font-semibold hover:border-2 hover:border-blue-400'>Login</span></Link></p>
      </div>
      </div>
    </>
  )
}

export default SignUp
