import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { ActivityIndicator, Alert } from 'react-native'
import { theme } from '../../core/theme'
import { useFormik } from 'formik';
import * as yup from "yup";
import { Background } from '../../components/Background'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Logo } from '../../components/Logo'
import { TextInput } from '../../components/TextInput'
import { login } from '../../redux/user/userThunk'
import { loginSuccess } from '../../redux/user/userRedux';
import { loginSaga } from '../../redux/actions/actionSaga';
export const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is not empty").min(2, "Password longer than 2 characters"),
    password: yup.string().min(5).required("Password is not empty").min(6, "Password longer than 6 characters"),
  });
  const { values, handleChange, handleBlur, handleSubmit, touched, errors, setFieldValue } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: () => {
      setIsLoading(true)
      setTimeout(() => dispatch(
        loginSaga({
          name: values.username,
          password: values.password,
          loggedIn: true,
        })
      ), 1000)
      if (values.username && values.password && values.username === 'pro' && values.password === '123123') {
      } else {
        setIsLoading(false)
        Alert.alert(
          'Name or password incorrect',
        );
      }
    },
    validationSchema,
  });
  return (
    <Background>
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="name"
        placeholder="Name"
        value={values.username}
        onChangeText={useCallback(handleChange('username'), [])}
        autoCapitalize="none"
        autoCompleteType="name"
        errorText={errors.username}
        onBlur={handleBlur('username')}
        touched={touched.username}
      />
      <TextInput
        label="password"
        placeholder="Password"
        returnKeyType="done"
        value={values.password}
        onChangeText={useCallback(handleChange('password'), [])}
        secureTextEntry
        errorText={errors.password}
        onBlur={handleBlur('password')}
        touched={touched.password}
      />
      {isLoading ? <ActivityIndicator size="large" color={'black'} /> : (
        <Button title='Submit' mode="contained" onPress={handleSubmit}>
          Login
        </Button>
      )}
    </Background>
  )
}