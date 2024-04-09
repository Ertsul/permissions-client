import { createBrowserRouter } from 'react-router-dom'
import loadable from '../utils/loadable'

export default createBrowserRouter([
  { path: '*', Component: loadable(() => import(/* webpackChunkName: 'Home' */ '../views/home/index')) }
])
