import { appRoutes } from '../utils/constants'
import { Suspense, lazy } from 'react'
import HomeScreen from '../components/home/HomeScreen'
import Loading from '../components/Loader/Loading'
// import Login from '../components/login/login-screen/Login'
import SetPassword from '../components/login/set-password/SetPassword'
import Notfound from '../components/notfound/Notfound'
import PrivateRoutes from '../utils/PrivateRoutes'
import ForgotPassword from '../components/login/forgot-password/ForgotPassword'
import ResetPassword from '../components/login/reset-password/ResetPassword'
import { useRoutes } from 'react-router-dom'

// eslint-disable-next-line react/display-name
const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  )
}

function Routes() {
  return useRoutes([
    // { path: appRoutes.ROOT, element: { <HomeScreen /> } },
    {
      path: '',
      children: [
        {
          path: appRoutes.LOGIN,
          element: <Login />,
        },
        {
          path: appRoutes.ROOT,
          element: <HomeScreen />,
        },
        {
          path: appRoutes.RESET_PASSWORD,
          element: <ResetPassword />,
        },
        { path: appRoutes.FORGOT_PASSWORD, element: <ForgotPassword /> },
      ],
    },
    {
      path: '',
      element: <PrivateRoutes />,
      children: [
        {
          path: appRoutes.SET_PASSWORD,
          element: <SetPassword />,
        },
      ],
    },
    {
      path: appRoutes.NOT_FOUND,
      element: <Notfound />,
    },
  ])
}

const Login = Loadable(lazy(() => import('../components/login/login-screen/Login')));

// const Login = Loadable(
//   lazy(async () => ({
//     default: (await import('../components/login/login-screen/Login')).Login,
//   }))
// )
// const ResetPassword = Loadable(
//   lazy(async () => ({
//     default: (await import('../components/login/reset-password/ResetPassword'))
//       .ResetPassword,
//   }))
// )
// const ForgotPassword = Loadable(
//   lazy(async () => ({
//     default: (
//       await import('../components/login/forgot-password/ForgotPassword')
//     ).ForgotPassword,
//   }))
// )
// const SetPassword = Loadable(
//   lazy(async () => ({
//     default: (await import('../components/login/set-password/SetPassword'))
//       .SetPassword,
//   }))
// )
// const Notfound = Loadable(
//   lazy(async () => ({
//     default: (await import('../components/notfound/Notfound')).Notfound,
//   }))
// )
// const HomeScreen = Loadable(
//   lazy(async () => ({
//     default: (await import('../components/home/HomeScreen')).HomeScreen,
//   }))
// )

export default Routes
