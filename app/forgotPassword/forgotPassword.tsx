"use client";
import { passwordSender } from '@/actions/password';
import CardWrapper from '@/components/Card/CardWrapper';
import notify from '@/components/costumeInputs/Notify';
import React from 'react'
import { Toaster } from 'react-hot-toast';
export default function ForgotPassword() {
    const [email, setEmail] = React.useState<string>('')
    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            passwordSender(email)
            notify({ status: 'success', message: 'Email sent' })

        } catch (err) {
            console.log(err)
            notify({ status: 'error', message: 'Email not sent' })
        }
    }
    return (
        <div
            className='w-screen h-screen bg-[#d8d8d8] flex flex-col items-center justify-center'
        >
            <CardWrapper
                header='Forgot Password'
                description='Enter your email to reset your password'
                Socials={false}
                footer=' '
                href='/'
                className='rounded-xl'
            >
                <Toaster />
                <form
                    onSubmit={handelSubmit}
                    className='flex flex-col items-center justify-center gap-5'>
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-[90%] h-12 bg-[#242424] border border-[#707070] rounded-xl p-5 text-white'
                    />
                    <button
                        type='submit'
                        className='w-[90%] h-12 bg-[#d8d8d8] rounded-xl text-[#242424] font-semibold'
                    >Send</button>
                </form>
            </CardWrapper>
        </div>
    )
}
