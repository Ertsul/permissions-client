import React, { useState } from 'react'
import { Layout, theme } from 'antd'
import Menu from '@/layout/Menu'
import LayoutBreadcrumb from '@/layout/Breadcrumb'
import { Outlet, useLocation } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout

const BaseLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const { state } = useLocation()
  const { key = '' } = state || {}

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <LayoutBreadcrumb />
          <Outlet key={key} />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2024 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default BaseLayout
