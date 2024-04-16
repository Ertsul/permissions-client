import { useAppSelector } from '@/store'
import { MenuOptions } from '@/store/types'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'

function getPath({ menuList, pathname }: { menuList: MenuOptions[]; pathname: string }) {
  const allPath: MenuOptions[] = []

  function getNode({ menu, pathname }: { menu: MenuOptions; pathname: string }): boolean {
    if (menu?.children?.length) {
      let targetChildren = false
      for (let i = 0; i < menu.children.length; i++) {
        const curRes = !!getNode({ menu: menu.children[i], pathname })
        if (!targetChildren) {
          targetChildren = curRes
        }
      }
      targetChildren && allPath.push(menu)
      return targetChildren
    } else {
      if (pathname === '/' + menu.key) {
        allPath.push(menu)
        return true
      }
      return false
    }
  }

  for (let i = 0; i < menuList.length; i++) {
    getNode({ menu: menuList[i], pathname })
  }
  return allPath.reduce((acc, cur) => {
    acc.push({ title: cur.label, key: cur.key })
    return acc
  }, [] as { title: string; key: string }[])
}

function LayoutBreadcrumb() {
  const { pathname } = useLocation()
  const { menuList = [] } = useAppSelector((state) => state.menu)

  let breadcrumbList: any[] = []
  if (menuList.length) {
    breadcrumbList = getPath({ menuList, pathname })
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbList}></Breadcrumb>
    </>
  )
}

export default LayoutBreadcrumb
