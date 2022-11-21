import { appRoutes } from '../utils/constants'
import HomeScreen from '../components/Home/HomeScreen'
import Login from '../components/login/login-screen/Login'
import SetPassword from '../components/login/set-password/SetPassword'
import Notfound from '../components/Notfound/Notfound'
import PrivateRoutes from '../utils/PrivateRoutes'
import ForgotPassword from '../components/login/forgot-password/ForgotPassword'

export const routes = [
  { path: appRoutes.ROOT, element: <HomeScreen />, secure: false, child: [] },
  { path: appRoutes.LOGIN, element: <Login />, secure: false, child: [] },
  {
    path: '',
    element: <PrivateRoutes />,
    secure: true,
    child: [
      {
        path: appRoutes.CHECK_PROTECTED,
        element: <HomeScreen />,
        secure: false,
        child: [],
      },
      {
        path: appRoutes.SET_PASSWORD,
        element: <SetPassword />,
        secure: false,
        child: [],
      },
      {
        path: appRoutes.FORGOT_PASSWORD,
        element: <ForgotPassword />,
        secure: false,
        child: [],
      },
    ],
  },
  {
    path: appRoutes.NOT_FOUND,
    element: <Notfound />,
    secure: false,
    child: [],
  },
]
