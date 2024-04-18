import loadable from '@/utils/loadable'
import LayoutGuard from '../guard'

// component module page
const HomeRoute = {
  path: '/first',
  name: 'First',
  element: <LayoutGuard />,
  meta: {
    title: 'first',
    icon: 'compo'
  },
  children: [
    {
      path: 'home',
      name: 'Home',
      Component: loadable(() => import(/* webpackChunkName: 'Home' */ '../../views/Home/index')),
      meta: {
        title: 'first - home',
        key: 'home'
      }
    },
    {
      path: 'test',
      name: 'Test',
      Component: loadable(() => import(/* webpackChunkName: 'Test' */ '../../views/Test/index')),
      meta: {
        title: 'first - test',
        key: 'test'
      }
    }
  ]
}

export default HomeRoute
