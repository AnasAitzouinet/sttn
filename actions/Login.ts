"use server"

import * as z from 'zod';
import axios from 'axios';
import { UserLogin } from '../schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { error } from 'console';

export const Login = async (values: z.infer<typeof UserLogin>) => {

    const validatedField = UserLogin.safeParse(values);
    if (!validatedField.success) {
        return { error: 'Invalid fields' };
    }

    // try {
    //     const response = 
    //     await axios.post("https://gestionres-production.up.railway.app/api/users/login",
    //     values);
    //     console.log(response.data);
    //     return { success: 'Login Successful!'  };
    // } catch (error) {
    //     return { error: 'Invalid credentials' };
    // }

    const { email, password } = validatedField.data;
    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials' };
                default:
                    return { error: 'An error occurred' };
            }
        }
        throw error;
    }
    return { success: "Login success" }
}