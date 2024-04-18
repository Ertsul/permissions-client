import { getRouteList } from '@/store/modules/menu'
import { getUserInfo } from '@/store/modules/user'
import { UserInfo } from '@/store/types'
import { getToken } from '@/utils/cookie'
import { Dispatch } from '@reduxjs/toolkit'
import { Spin, message } from 'antd'
import { ReactNode, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const whiteList: string[] = ['/login']

const GuardRoute = ({
  userInfo,
  getUserInfoInStore,
  getRouteListInStore,
  children
}: {
  userInfo?: UserInfo
  getUserInfoInStore?: any
  getRouteListInStore?: any
  children: ReactNode
}) => {
  const { pathname } = useLocation()
  const [childrenNode, setChildrenNode] = useState(<Spin size='large' />)

  async function authHandler() {
    if (pathname === '/login') {
      return children
    }
    const loginWithRedirectUrl = <Navigate to={`/login?redirect=${pathname}`} replace />
    if (!getToken()) {
      return whiteList.includes(pathname) ? children : loginWithRedirectUrl
    }
    const hasUserInfo = !!(userInfo?.username && userInfo?.id)
    if (hasUserInfo) {
      return children
    }
    try {
      await getUserInfoInStore()
      await getRouteListInStore()
      return children
    } catch (error: any) {
      message.error(error)
      return loginWithRedirectUrl
    }
  }

  useEffect(() => {
    const fetchAuth = async () => {
      const targetChildrenNode: any = await authHandler()
      setChildrenNode(targetChildrenNode)
    }
    fetchAuth()
  }, [])

  return childrenNode
}

const mapStateToProps = (state: any) => {
  return { userInfo: state.user.userInfo }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserInfoInStore: () => dispatch(getUserInfo()),
  getRouteListInStore: () => dispatch(getRouteList())
})

export default connect(mapStateToProps, mapDispatchToProps)(GuardRoute)
