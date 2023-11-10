'use client'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';


function auth() {
    const [authType, setAuthType] = useState<"signin" | "signup">("signin");
    const [showPasswod, setshowPasswod] = useState<boolean>(false);

    const { register: signInRegister,
        handleSubmit: handleSignInSubmit,
        formState: { errors } } = useForm<FieldValues>({
        })
    const { register: signUpRegister,
        handleSubmit: handleSignUpSubmit,
        formState: { errors: signUpErrors } } = useForm<FieldValues>({
        })
    const onSignInSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);

    }

    return (
        <div className='h-screen grid grid-flow-col'>
            <div className='w-full sm:!max-w-md ml-auto bg-blue-200 h-full'>
                {authType == 'signin' ? (
                    <div className='my-10 pt-10 bg-inherit space-y-3'>
                        <FormControl variant="floating" className='bg-inherit'>
                            <Input placeholder=" " {...signInRegister("userName",{ required: true })} />
                            <FormLabel >user name</FormLabel>
                        </FormControl>
                        <div className='relative'>
                            <FormControl variant="floating" className='bg-inherit' >
                                <Input type={showPasswod ? 'text' : 'password'} placeholder=" " {...signInRegister("password",{ required: true })} />
                                <FormLabel >password</FormLabel>
                            </FormControl>
                            <span onClick={() => setshowPasswod(!showPasswod)} className='absolute right-0 top-2 z-30'>
                                {showPasswod ? 'Hide' : 'Show'}
                            </span>
                        </div>
                        <Button  loadingText='Signing in' onClick={handleSignInSubmit(onSignInSubmit)} >
                            Sign in
                        </Button>
                    </div>) : (
                    <div className='my-10 pt-10 bg-inherit'>
                        <FormControl variant="floating" className='bg-inherit'>
                            <Input placeholder=" " />
                            <FormLabel >email</FormLabel>
                        </FormControl>
                        <FormControl variant="floating" className='bg-inherit'>
                            <Input placeholder=" " />
                            <FormLabel >user name</FormLabel>
                        </FormControl>
                        <FormControl variant="floating" className='bg-inherit'>
                            <Input placeholder=" " />
                            <FormLabel>password</FormLabel>
                        </FormControl>
                        <FormControl variant="floating" className='bg-inherit'>
                            <Input placeholder=" " />
                            <FormLabel>re enter password</FormLabel>
                        </FormControl>
                        <Button isLoading loadingText='Signing up'                         >
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