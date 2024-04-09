import { Component } from 'react'
import Loadable from '@loadable/component'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

class loadingComponent extends Component {
  constructor(props: any) {
    super(props)
    NProgress.start()
  }
  componentDidMount() {
    NProgress.done()
  }
  render() {
    return <div />
  }
}

const loadable = (loader: any, Loading = loadingComponent) =>
  Loadable(loader, {
    fallback: <Loading />
  })

export default loadable
