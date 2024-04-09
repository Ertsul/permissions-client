import { Component } from 'react'
import Router from './routes'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Router />
      </ConfigProvider>
    )
  }
}

export default App
