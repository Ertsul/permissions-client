import { Component } from 'react'
import Router from './routes'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import store from './store/index'
import { Provider } from 'react-redux'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <Router />
        </ConfigProvider>
      </Provider>
    )
  }
}

export default App
