import { createBrowserRouter, redirect } from 'react-router-dom'
import loadable from '../utils/loadable'
import { RouteObject } from './types'

const metaRoutes: any = import.meta.glob('./modules/*.tsx', { eager: true })

let routeList: RouteObject[] = []

function genFullPath(routes: RouteObject[], parentPath = '') {
  const curRoutes = []
  for (let index = 0; index < routes.length; index++) {
    const route: RouteObject | any = routes[index]

    if (route.path!.startsWith('/')) {
      route.fullPath = route.path
    } else {
      route.fullPath = `${parentPath}/${route.path}`
    }

    if (route?.children?.length) {
      route.children = genFullPath(route.children, route.fullPath)
    }
    curRoutes.push(route)
  }
  return curRoutes
}

Object.keys(metaRoutes).forEach((key) => {
  const module = metaRoutes[key].default || {}
  const moduleList = Array.isArray(module) ? [...module] : [module]
  routeList = genFullPath(moduleList)
})

const browserRouter = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/first/home'),
    Component: loadable(() => import(/* webpackChunkName: 'index' */ '@/layout/index'))
  },
  ...routeList,
  { path: '/login', Component: loadable(() => import(/* webpackChunkName: 'Login' */ '@/views/Login/index')) },
  { path: '/404', Component: loadable(() => import(/* webpackChunkName: '404' */ '@/views/NotFound/index')) }
])

console.log('>> browserRouter :', browserRouter)

export default browserRouter
