import { useRoutes } from 'react-router-dom'
import Registerlayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Register from './pages/Register'

export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
    {
      path: '/login',
      element: (
        <Registerlayout>
          <Login />
        </Registerlayout>
      )
    },
    {
      path: '/register',
      element: (
        <Registerlayout>
          <Register />
        </Registerlayout>
      )
    }
  ])
  return routeElement
}
