import Cookies from 'js-cookie'
import Token from '@/constant/token'

export const getToken = () => Cookies.get(Token.name) // cookies 的设置后端做
export const setToken = (value: string) => Cookies.set(Token.name, value) // cookies 的设置后端做
export const removeToken = () => Cookies.remove(Token.name)
