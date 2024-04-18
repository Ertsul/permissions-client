import BaseLayout from '@/layout'
import GuardRoute from './guardRoute'

const LayoutGuard: React.FC = () => {
  return (
    <>
      <GuardRoute>
        <BaseLayout />
      </GuardRoute>
    </>
  )
}


export default LayoutGuard
