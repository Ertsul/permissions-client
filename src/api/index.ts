import Qs from 'qs'
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosError, Canceler } from 'axios'
import type { RootObject } from '../types/common'
// import router from '@/router/index'
import { message } from 'antd'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_NAME,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: false
})

const pendingRequestMap: Map<string, Canceler> = new Map() // 存放等待中的请求

/**
 * 生成请求 key（用于取消短时间内同一 request 重复请求）
 * @param {AxiosRequestConfig} config
 * @returns
 */
function generateReqKey(config: AxiosRequestConfig = {}): string {
  const { method, url, params, data } = config || {}
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&')
}

/**
 * 为正在等待的请求添加 cancelToken
 * @param {AxiosRequestConfig} config
 */
function addPendingRequest(config: AxiosRequestConfig = {}): void {
  const requestKey: string = generateReqKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel: Canceler) => {
      if (!pendingRequestMap.has(requestKey)) {
        pendingRequestMap.set(requestKey, cancel)
      }
    })
}

/**
 * 移除 cancelToken
 * @param {AxiosRequestConfig} config
 */
function removePendingRequest(config: AxiosRequestConfig = {}): void {
  const requestKey: string = generateReqKey(config)
  if (pendingRequestMap.has(requestKey)) {
    const cancelToken = pendingRequestMap.get(requestKey)
    if (cancelToken) {
      cancelToken(requestKey)
      pendingRequestMap.delete(requestKey)
    }
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    if (config) {
      removePendingRequest(config)
      addPendingRequest(config)
    }
    return config
  },
  // eslint-disable-next-line prefer-promise-reject-errors
  (error: AxiosError) =>
    Promise.reject({
      errMsg: error || '404(TimeOut)',
      errCode: 404
    })
)

axiosInstance.interceptors.response.use(
  (response) => {
    removePendingRequest(response.config)
    const data = response.data
    const isSuccess: boolean = response.status == 200 && data && (data.errCode === 0 || data.errCode === 200)
    if (isSuccess) {
      return data
    }
    let msg: string
    if (data) {
      msg = data.message
      const errCode = data.errCode
      switch (errCode) {
        case 102:
        case 10002:
          // router.replace({
          //   path: '/login',
          //   query: {
          //     redirect: router.currentRoute.value.path
          //   }
          // })
          break
        case 10001:
        case 10005:
        case 101:
        case 103:
        case 400:
        case 104:
        case 404:
          message.error(msg)
          break
      }
    }
    return data
  },
  (error) => {
    removePendingRequest(error.config || {})
    if (error.message && pendingRequestMap.has(error.message)) {
      return Promise.reject(error.message)
    }
    let code = 404
    let message = error?.data?.msg || error.response?.data?.msg
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // case 403:
          // case 302:
          // 清除token信息并跳转到登录页面
          // removeToken()
          // router.replace({
          //   path: '/login',
          //   query: {
          //     redirect: router.currentRoute.value.fullPath
          //   }
          // })
          break
        case 502:
          message = '502(?)'
          break
      }
      code = error.response.status
    } else if (error.request) {
      message = 'msg.res.404'
      code = 101
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      errCode: code,
      errMsg: message || '404(req.error)'
    })
  }
)

const responseErrorCallback = (err: any): Promise<any> => {
  err?.errMsg && message.error(typeof err.errMsg == 'string' ? err.errMsg : JSON.stringify(err.errMsg))
  return Promise.reject(err)
}

export async function post<T, U>(url: string, params?: T): Promise<RootObject<U>> {
  return axiosInstance
    .post(url, params || {})
    .then((res) => Promise.resolve(res))
    .catch(responseErrorCallback)
}

export async function get<T, U>(url: string, params?: T): Promise<RootObject<U>> {
  return axiosInstance
    .get(url, { params })
    .then((res) => Promise.resolve(res))
    .catch(responseErrorCallback)
}
