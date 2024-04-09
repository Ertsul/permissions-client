import { Layout, Divider } from 'antd'
import { Component, ReactNode } from 'react'
import { Button, DatePicker } from 'antd'

class HomeView extends Component {
  state = {
    msg: 'btn'
  }

  render(): ReactNode {
    return (
      <Layout>
        <div className='base-style'>
          <Button>{this.state.msg}</Button>
          <DatePicker />
          <h3>多级导航</h3>
          <Divider />
          <p>这个是多级导航</p>
        </div>
      </Layout>
    )
  }
}

export default HomeView
