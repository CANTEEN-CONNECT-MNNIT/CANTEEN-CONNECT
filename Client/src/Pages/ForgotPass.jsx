import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Input from '../Components/Input';
import Loading from '../Components/Loading';


function ForgotPass() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailfind, setEmailFind] = useState(false);
    const [success, setSuccess] = useState("");
    const { register, handleSubmit, getValues, setValue, formState: { errors }, } = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmpassword: "",
            otp: "",
        }
    })
    const dataSubmit = async (data) => {
        console.log(data);
    }
    const getOtp = async () => {
        // call to get otp-> getValues('email');
        if (true && getValues('email').length) setEmailFind(true);
        else setEmailFind(false);
    }
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <div className='min-h-screen mx-auto py-32 flex justify-center items-center'>
                <div className='border bg-slate-50 dark:bg-gray-900 border-blue-400 dark:border-slate-500  rounded-lg '>
                    <form onSubmit={handleSubmit(dataSubmit)} className='pt-6 pb-2 px-4 flex flex-col justify-center items-center'>
                        <h1 className='dark:text-gray-300 text-darken text-xl font-bold text-center text-gray-900'>Reset-Password</h1>
                        <div className='flex flex-col pt-6'>
                            <div>
                                <Input label={"Email"} placeholder={"Enter your email..."} {...register("email", {
                                    required: "Email is required!",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email address",
                                    },
                                })} />
                                {errors && errors?.email && errors.email?.message.length > 0 && <p className='text-red-600 text-center mb-2 text-md'>{errors.email.message}</p>}
                            </div>
                            <div className='flex justify-center items-center'>
                                <button onClick={getOtp} type='button' className="my-4 dark:hover:bg-gray-900 dark:bg-gray-950 bg-blue-500 w-fit hover:bg-blue-700 text-white font-bold 
                                    py-1 px-4 border dark:border-neutral-800 dark:hover:border-black border-blue-700 rounded text-md">
                                    Send OTP
                                </button>
                            </div>
                            {
                                emailfind && <div>
                                    <div>
                                        <Input label={"New Password"} type="password" placeholder={"New password..."} {...register("password", {
                                            required: "Password is required",
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                message: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.",
                                            },
                                        })} />
                                        {errors && errors?.password && errors.password?.message.length > 0 && <p className=' mb-2 text-center text-md text-red-600'>{errors.password.message}</p>}
                                    </div>
                                    <div>
                                        <Input label={"Confirm Password"} type="password" placeholder={"Confirm password..."} {...register("confirmpassword", {
                                            required: "Confirm Password is required",
                                            validate: (value) => value === watch("password") || "Passwords do not match"
                                        })} />
                                        {errors && errors?.confirmpassword && errors.confirmpassword?.message.length > 0 && <p className=' mb-2 text-center text-md text-red-600'>{errors.confirmpassword.message}</p>}
                                    </div>
                                    <div>
                                        <Input label={"OTP"}  placeholder={"Enter Otp..."} {...register("otp", {
                                            required: "Otp is must!",
                                        })} />
                                        {errors && errors?.otp && errors.otp?.message.length > 0 && <p className=' mb-2 text-center text-md text-red-600'>{errors.otp.message}</p>}
                                    </div>
                                    <div className='flex justify-center items-center'>
                                <button onClick={handleSubmit(dataSubmit)} className="my-4 dark:hover:bg-gray-900 dark:bg-gray-950 bg-blue-500 w-fit hover:bg-blue-700 text-white font-bold 
                                    py-1 px-4 border dark:border-neutral-800 dark:hover:border-black border-blue-700 rounded text-md">
                                    Reset
                                </button>
                            </div>
                                </div>
                            }
                            <div>
                                {error.length > 0 && <p className='text-red-600 text-center mb-2 text-md'>{error}</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPass