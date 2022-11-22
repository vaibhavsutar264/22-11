import React, { FormEvent, useState, useEffect, SyntheticEvent } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../../../redux/slices/authSlice'
import { yupResolver } from '@hookform/resolvers/yup';
import { Password } from '../../../types/authType'
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from '../../../redux/store'

import {
  Box,
  TextField,
  InputLabel,
  styled,
  Button,
  ButtonProps,
  FormGroup,
  FormControl,
} from '@mui/material'
import { purple } from '@mui/material/colors'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
// Importing Images
import Background from '../../../assets/images/login-bg.jpg'
import ChartImg from '../../../assets/images/svg/Chart.svg'
import PieChartImg from '../../../assets/images/svg/PieCharts.svg'
import SalesImg from '../../../assets/images/svg/Sales.svg'
import VoiceImg from '../../../assets/images/svg/Voice.svg'
import ChatImg from '../../../assets/images/svg/Chat.svg'
import VideoImg from '../../../assets/images/svg/Video.svg'
import WhatsappImg from '../../../assets/images/svg/Whatsapp.svg'
import useLocales from '../../../hooks/useLocales'
import BackgroundBox from '../../common/elements/backGroundBox'
import BannerBg from '../../common/elements/banner'
import { useParams } from 'react-router-dom';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  height: '70px',
  width: '100%',
  borderRadius: '35px',
  mixBlendMode: 'luminosity',
  opacity: 0.5,
  '&:hover': {
    backgroundColor: purple[700],
  },
}))

interface State {
  amount: string
  password: string
  weight: string
  weightRange: string
  showPassword: boolean
}

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [open, setOpen] = useState(false)
  const { isError, isSuccess, message } = useAppSelector(
    (state: any) => state.auth || {}
  )
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const { t } = useLocales()
  const LoginSchema = Yup.object().shape({
    password: Yup.string().required('Password is required !!').min(8),
    confirmPassword:Yup.string().required('Password is required !!').min(8).oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  
  const defaultValues = {
    password: '',
    confirmPassword: '',
    // remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
    register
  } = methods;

  const onSubmit = async ( data: any ) => {
    if (password !== confirmPassword) {
      console.log('password and confirm password not same')
      toast.error('password and confirm password not same')
      return
    }
    try {
      const userPassword: Password = {
        password: password,
        confirmPassword: confirmPassword,
      }
      await dispatch(resetPassword(token, data))
    } catch (error) {
      console.error(error);
      reset();
    }
    
  };
  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (isSuccess) {
      setPassword('')
      setConfirmPassword('')
      // dispatch(reset())
    }
  }, [isError, isSuccess, message, dispatch])

  const handlePasswordChange = (e: SyntheticEvent) => {
    e.preventDefault()
    setPassword((e.target as HTMLInputElement).value)
    const patternVariable =
      "(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*+`~'=?|][()-<>/]).{8,}" //uppercase lowercase symbol and number
    const passwordBoxElement = document.getElementById(
      'password-box'
    ) as HTMLButtonElement
    if ((e.target as HTMLInputElement).value.match(patternVariable)) {
      passwordBoxElement.className = 'input-wrapper success'
    } else {
      passwordBoxElement.className = 'input-wrapper'
    }
  }

  const handleConfirmPasswordChange = (e: SyntheticEvent) => {
    e.preventDefault()
    setConfirmPassword((e.target as HTMLInputElement).value)
    const confirmPasswordpatternVariable =
      "(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*+`~'=?|][()-<>/]).{8,}" //uppercase lowercase symbol and number
    const submitButtonElement = document.getElementById(
      'btn-enable-style'
    ) as HTMLButtonElement
    const confirmpasswordBoxElement = document.getElementById(
      'confirm-password-box'
    ) as HTMLButtonElement
    if (
      (e.target as HTMLInputElement).value.match(confirmPasswordpatternVariable)
    ) {
      submitButtonElement.className = 'customBtn-01 btn-enable-style'
      confirmpasswordBoxElement.className =
        'input-wrapper password-checkHide success'
      setOpen(false)
    } else {
      submitButtonElement.className = 'customBtn-01'
      confirmpasswordBoxElement.className = 'input-wrapper password-checkHide'
      setOpen(true)
    }
  }

  return (
    <Box className="account__screen">
      {/* ACCOUNT SCREEN BANNER START*/}
      <BannerBg />
      {/* ACCOUNT SCREEN BANNER END */}
      {/* ACCOUNT SCREEN ANIMATION START */}
      <BackgroundBox />
      {/* ACCOUNT SCREEN ANIMATION END */}
      {/* ACCOUNT FORM START */}
      <Box
        sx={{ flexGrow: 1 }}
        id="login-form"
        className="account__form login-form"
      >
        <div className="form__inner">
          <Box sx={{ width: 1 }} className="account__form__header">
            <h3 className="title">{t<string>('resetPassword')}</h3>
            <p className="sub__title">{t<string>('resetPasswordSubTitle')}</p>
          </Box>
          <Box sx={{ width: 1 }} className="account__form__error">
              <p className="error__msg">{message && message}</p>
            </Box>
          <Box sx={{ flexGrow: 1 }} className="account__form__body">
            <form onSubmit={handleSubmit(onSubmit)} action="#" method="post">
              <FormGroup>
                <FormControl
                  className="input-wrapper"
                  id="password-box"
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    position: 'relative',
                    width: 1,
                    margin: '20px 0px',
                  }}
                >
                  <InputLabel htmlFor="username" className="label__icon">
                    <LockOpenIcon id="unlock-icon" />
                  </InputLabel>
                  <TextField
                    required
                    id="password"
                    label={t<string>('password')}
                    variant="standard"
                    sx={{ width: 1 }}
                    // name="password"
                    type="password"
                    inputProps={{
                      'data-testid': 'password-element',
                      autoComplete: 'off',
                    }}
                    value={password}
                    onInput={handlePasswordChange}
                    {...register('password')}
                  />
                  <p className="text-error">{errors.password ?.message}</p>
                </FormControl>

                <FormControl
                  className="input-wrapper password-checkHide"
                  id="confirm-password-box"
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    position: 'relative',
                    width: 1,
                    margin: '20px 0px',
                  }}
                >
                  <InputLabel htmlFor="confirmPassword" className="label__icon">
                    <LockOpenIcon id="unlock-icon" />
                  </InputLabel>
                  <TextField
                    required
                    id="confirmPassword"
                    label={t<string>('confirmPassword')}
                    variant="standard"
                    sx={{ width: 1 }}
                    type={values.showPassword ? 'text' : 'password'}
                    autoComplete="false"
                    // name="password"
                    inputProps={{ 'data-testid': 'confirm-password-element' }}
                    value={confirmPassword}
                    onInput={handleConfirmPasswordChange}
                    {...register('confirmPassword')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            className="password-toggle"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <p className="text-error">{errors.confirmPassword ?.message}</p>
                </FormControl>
                <FormControl
                  className="input-wrapper password-checkHide"
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    position: 'relative',
                    width: 1,
                    margin: '20px 0px',
                  }}
                >
                  <a href="/forgot-password" className="forgot-password">
                    {t<string>('forgotPassword')}
                  </a>
                </FormControl>
                <FormControl
                  className="input-wrapper submitBtn"
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    position: 'relative',
                    width: 1,
                    marginTop: '50px',
                  }}
                >
                  <ColorButton
                    variant="contained"
                    id="btn-enable-style"
                    data-testid="button-element"
                    type="submit"
                    name="submit"
                    disabled={open}
                    className="customBtn-01"
                  >
                    {t<string>('done')}
                  </ColorButton>
                </FormControl>
              </FormGroup>
            </form>
          </Box>
        </div>
      </Box>
      {/* ACCOUNT FROM END */}
    </Box>
  )
}

export default ResetPassword
