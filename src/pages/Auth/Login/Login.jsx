import React from 'react'
import * as S from '../Register/register.style'
import { useForm, Controller } from 'react-hook-form'
import InputText from 'src/components/InputText/InputText'
import InputPassword from 'src/components/InputPassword/InputPassword'
import ErrorMessage from 'src/components/ErrorMessege/ErrorMessage'
import { rules } from 'src/constants/rules'
import { path } from 'src/constants/path'
import { Button } from 'src/assets/styles/utils'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
// import { login } from '../auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { login } from '../auth.slice'
import { Helmet } from 'react-helmet'

const Login = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError
  } = useForm({
    defaultValue: {
      email: '',
      password: ''
    }
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async data => {
    const body = {
      email: data.email,
      password: data.password
    }
    try {
      const res = await dispatch(login(body))
      unwrapResult(res)
      history.push(path.home)
    } catch (error) {
      if (error.status === 422) {
        for (const key in error.data) {
          setError(key, {
            type: 'server',
            message: error.data[key]
          })
        }
      }
    }
  }
  return (
    <S.StyledRegister className="">
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <S.Container className="container">
        <S.Banner />
        <S.FormWrapper>
          <S.FormTitle>Đăng nhập</S.FormTitle>
          <S.Form onSubmit={handleSubmit(handleLogin)} noValidate>
            <S.FormControl>
              <Controller
                name="email"
                control={control}
                rules={rules.email}
                render={({ field }) => (
                  <InputText
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={field.onChange}
                    value={getValues('email')}
                  />
                )}
              />
              <ErrorMessage errors={errors} name="email" />
            </S.FormControl>
            <S.FormControl>
              <Controller
                name="password"
                control={control}
                rules={rules.password}
                render={({ field }) => (
                  <InputPassword
                    placeholder="Mật khẩu"
                    name="password"
                    onChange={field.onChange}
                    value={getValues('password')}
                  />
                )}
              />
              <ErrorMessage errors={errors} name="password" />
            </S.FormControl>
            <S.FormButton>
              <Button type="submit">Đăng nhập</Button>
            </S.FormButton>
          </S.Form>
          <S.FormFooter>
            <span>Bạn mới biết đến Shopee?</span>
            <Link to={path.register} className="link">
              Đăng ký
            </Link>
          </S.FormFooter>
        </S.FormWrapper>
      </S.Container>
    </S.StyledRegister>
  )
}

export default Login
