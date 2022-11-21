import './i18n'
import Header from './components/Header/Header'
import { Toggle } from './themes/Toggle'
import { useDarkMode } from './themes/useDarkMode'
import { GlobalStyles, lightTheme, darkTheme } from './themes/globalStyles'
import { ThemeProvider } from 'styled-components'
import useAuth from './hooks/useAuth'
import RouteHandler from './route/RouteHandler'
import './assets/sass/global/global.scss'
import { appThemes } from './utils/constants'

const App = () => {
  useAuth()
  const [theme, toggleTheme] = useDarkMode()
  const themeMode = theme === appThemes.LIGHT_THEME ? lightTheme : darkTheme
  return (
    <ThemeProvider theme={themeMode}>
      <Header toggleTheme={toggleTheme} />
      <GlobalStyles />
      <RouteHandler />
      <Toggle theme={theme} toggleTheme={toggleTheme} />
    </ThemeProvider>
  )
}

export default App
