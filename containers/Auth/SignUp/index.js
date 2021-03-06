
import { memo } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as authAPI from 'services/api-auth'
import GradientButton from 'components/UI/Buttons/GradientButton'
import MagicTextField from 'components/UI/MagicTextField'
import AuthWrapper, { authPageStyles } from '../Shared/AuthWrapper'
import AuthTabs from '../Shared/AuthTabs'
import useLoading from 'utils/hooks/useLoading'
import { showErrorToast, showSuccessToast } from 'utils/helpers/toast'
import LINKS from 'utils/constants/links'
import {
  EMAIL_VALID,
  NAME_VALID,
  PASSWORD_VALID
} from 'utils/constants/validations'

const schema = yup.object().shape({
  email: EMAIL_VALID,
  name: NAME_VALID,
  password: PASSWORD_VALID
});

const useStyles = makeStyles(() => ({
  root: {}
}));

const SignUp = () => {
  const classes = useStyles();

  const authClasses = authPageStyles();
  const router = useRouter();
  const { changeLoadingStatus } = useLoading();

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    changeLoadingStatus(true)
    try {
      const params = {
        email: data.email,
        name: data.name,
        password: data.password
      }

      const { message } = await authAPI.register(params);
      showSuccessToast(message)
      router.push(LINKS.SIGN_IN.HREF)
    } catch (error) {
      if (error.response) {
        const { data: { message } } = error.response;
        showErrorToast(message)
      }
    }
    changeLoadingStatus(false)
  };

  return (
    <AuthWrapper>
      <AuthTabs />
      <form
        noValidate
        className={authClasses.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          as={<MagicTextField />}
          name='email'
          type='email'
          label='E-mail'
          error={errors.email?.message}
          className={authClasses.input}
          control={control}
          defaultValue=''
        />
        <Controller
          as={<MagicTextField />}
          name='name'
          label='Username'
          error={errors.name?.message}
          className={authClasses.input}
          control={control}
          defaultValue=''
        />
        <Controller
          as={<MagicTextField />}
          name='password'
          type='password'
          label='Password'
          error={errors.password?.message}
          className={authClasses.input}
          control={control}
          defaultValue=''
        />
        <GradientButton
          type='submit'
          className={authClasses.button}
        >
          Sign Up
        </GradientButton>
      </form>
    </AuthWrapper>
  )
}

export default memo(SignUp)