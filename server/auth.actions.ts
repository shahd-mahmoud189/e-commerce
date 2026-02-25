'use server'
import axios, { AxiosRequestConfig } from 'axios';
import { AuthState } from './../store/slices/auth.slice';
import { cookies, headers } from 'next/headers';

export async function setToken(token:string, rememberMe:boolean):Promise<void>{
    const cookie = await cookies()
    if(rememberMe){
        cookie.set('token', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60
    })
    }
    else{
        cookie.set('token', token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60
    })
}}

export async function getToken():Promise<string|null>{
    const cookie = await cookies()
    const token = cookie.get('token')?.value || null
    return token
}

export async function removeToken():Promise<void>{
    const cookie = await cookies()
    cookie.delete('token')
}

export async function verifyToken() :Promise<AuthState>{
    const cookie = await cookies()
    const token = cookie.get('token')?.value || null
    if(!token){
        return {
            isAuthinticated: false,
            userInfo: null
        }
    }
    try {
        const options :AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v1/auth/verifyToken',
            method: 'GET',
            headers:{
                token
            }
        }
        const {data} = await axios.request(options)
        const {id, name, role} = data.decoded
        if(data.message === 'verified'){
            return {
            isAuthinticated: true,
            userInfo:{
                id,
                name,
                role
            }
        }
        }else{
            return {
            isAuthinticated: false,
            userInfo: null
        }
        }
    } catch (error) {
        return {
            isAuthinticated: false,
            userInfo: null
        }
    }
    
}