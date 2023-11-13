'use client'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import {signIn} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"

function  auth() {
    const [authType, setAuthType] = useState<"signin" | "signup">("signin");
    const [showPasswod, setshowPasswod] = useState<boolean>(false);
    const router = useRouter();
    const {data} : any = useSession()
      console.log(data);

    const { register: signInRegister,
        handleSubmit: handleSignInSubmit,
        formState: { errors } } = useForm<FieldValues>({
        })
    const { register: signUpRegister,
        handleSubmit: handleSignUpSubmit,
        watch,
        formState: { errors: signUpErrors } } = useForm<FieldValues>({
        })
    const onSignInSubmit: SubmitHandler<FieldValues> = async (data) => {
        const res = await signIn("email", {
            email: data.email,
            password: data.password,
            // redirect: false
        })
    }
    const onSignUpSubmit: SubmitHandler<FieldValues> = (data) => {
        axios.post('/api/register', data).then(async() => {
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            })

            console.log('Account created')
        })

        
    }

    return (
        <div className='h-screen grid grid-flow-col'>
            <div className='w-full sm:!max-w-md ml-auto bg-blue-200 h-full'>
                {authType == 'signin' ? (
                    <div className='my-10 pt-10 bg-inherit space-y-3'>
                        <FormControl variant="floating" className='bg-inherit' >
                            <Input placeholder=" " {...signInRegister("userName", { required: true })} />
                            <FormLabel >user name</FormLabel>
                        </FormControl>
                        <div className='relative'>
                            <FormControl variant="floating" className='bg-inherit' >
                                <Input type={showPasswod ? 'text' : 'password'} placeholder=" " {...signInRegister("password", { required: true })} />
                                <FormLabel >password</FormLabel>
                            </FormControl>
                            <span onClick={() => setshowPasswod(!showPasswod)} className='absolute right-0 top-2 z-30'>
                                {showPasswod ? 'Hide' : 'Show'}
                            </span>
                        </div>
                        <Button loadingText='Signing in' onClick={handleSignInSubmit(onSignInSubmit)} >
                            Sign in
                        </Button>
                    </div>) : (
                    <div className='my-10 pt-10 bg-inherit'>
                        <FormControl variant="floating" className='bg-inherit'>
                            <Input placeholder=" " {...signUpRegister("email", { required: true })} />
                            <FormLabel >email</FormLabel>
                        </FormControl>
                        <FormControl variant="floating" className='bg-inherit'>
                            <Input placeholder=" " {...signUpRegister("name", { required: true })} />
                            <FormLabel >user name</FormLabel>
                        </FormControl>
                        <FormControl variant="floating" className='bg-inherit'>
                            <Input placeholder=" " {...signUpRegister("password", { required: true })} />
                            <FormLabel>password</FormLabel>
                        </FormControl>
                        <FormControl variant="floating" className='bg-inherit' >
                            <Input placeholder=" " {...signUpRegister("confirm_password", {
                                required: true,
                                validate: (val: any) => {
                                    if (watch('password') != val) {
                                        return "Your passwords do no match";
                                    }
                                },
                            })} />
                            <FormLabel>re enter password</FormLabel>{signUpErrors.confirm_password && (
                                <span className="text-red-500">{signUpErrors.confirm_password.message as any}</span>
                            )}
                        </FormControl>
                        {signUpErrors.confirm_password && (
                            <span className="text-red-500">{signUpErrors.confirm_password.message as any}</span>
                        )}
                        <Button loadingText='Signing up' onClick={handleSignUpSubmit(onSignUpSubmit)} >
                            Sign up
                        </Button>
                    </div>
                )}

                <div>
                    {authType == 'signin' ?
                        <span>
                            Create a new account <span onClick={() => setAuthType('signup')} className="cursor-pointer hover:underline">Signup</span>
                        </span> :
                        <span>
                            Already have a account <span onClick={() => setAuthType('signin')} className="cursor-pointer hover:underline">SignIn</span>
                        </span>
                    }
                </div>

            </div>
        </div>
    )
}

export default auth