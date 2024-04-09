import { Component, ReactNode } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from './routes'

class Router extends Component {
  render(): ReactNode {
    return <RouterProvider router={router} />
  }
}

export default Router
