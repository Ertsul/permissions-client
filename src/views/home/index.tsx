import { Layout, Divider } from 'antd'
import { Component, ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { Button, DatePicker } from 'antd'
import { increment } from '../../store/modules/counter'

export default function HomeView() {
  const dispatch = useAppDispatch()
  const counter = useAppSelector((state) => state.counter.value)
  const state = {
    msg: 'btn'
  }
  return (
    <Layout>
      <div className='base-style'>
        <span>{counter}</span>
        <Button onClick={() => dispatch(increment())}>{state.msg}</Button>
        {/* <Button>{state.msg}</Button>
        <DatePicker />
        <h3>多级导航</h3>
        <Divider />
        <p>这个是多级导航</p> */}
      </div>
    </Layout>
  )
}
