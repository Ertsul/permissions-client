import browserRouter from '@/routes/routes'
import { RouteObject } from '@/routes/types'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'

function getPath({ routes, pathname }: { routes: RouteObject[]; pathname: string }) {
  const allPath: RouteObject[] = []

  function getNode({ route, pathname }: { route: RouteObject; pathname: string }): boolean {
    if (route?.children?.length) {
      let targetChildren = false
      for (let i = 0; i < route.children.length; i++) {
        const hitRoute = !!getNode({ route: route.children[i], pathname })
        if (!targetChildren) {
          targetChildren = hitRoute
        }
      }
      targetChildren && allPath.push(route)
      return targetChildren
    } else {
      if (pathname === route.fullPath) {
        allPath.push(route)
        return true
      }
      return false
    }
  }

  for (let i = 0; i < routes.length; i++) {
    getNode({ route: routes[i], pathname })
  }
  return allPath.reduce((acc, cur: any) => {
    acc.push({ title: cur.meta.title, key: cur.name })
    return acc
  }, [] as { title: string; key: string }[])
}

function LayoutBreadcrumb() {
  const { pathname } = useLocation()
  // const { menuList = [] } = useAppSelector((state) => state.menu)
  let breadcrumbList: any[] = []
  if (browserRouter.routes.length) {
    breadcrumbList = getPath({ routes: browserRouter.routes as any, pathname })
  }
  return <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbList}></Breadcrumb>
}

export default LayoutBreadcrumb
