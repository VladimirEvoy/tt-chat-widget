import { StyledRegister, LoginButton, LoginInput } from './style'
import { useState } from 'react'
import PropTypes from 'prop-types'

export const Login = ({ onLogin }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    onLogin({ name, email })
  }

  return (
    <StyledRegister onSubmit={handleSubmit}>
      <LoginInput
        id='name'
        name='name'
        type='text'
        placeholder='Name'
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <LoginInput
        placeholder='Email'
        id='email'
        name='email'
        type='email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <LoginButton type='submit'>Login</LoginButton>
    </StyledRegister>
  )
}

Login.propTypes = {
  onLogin: PropTypes.func,
}
