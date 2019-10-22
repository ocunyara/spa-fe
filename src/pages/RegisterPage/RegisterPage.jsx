import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'

import { FormWrapper } from 'components/LoginLayout/FormWrapper'
import { Button } from 'components/Button/Button'
import { Input } from 'components/Input/Input'
import firebase from 'components/Firebase/firebase'

import styles from './RegisterPage.module.scss'

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  fullName: '',
}

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  handleChange = fildName => value => {
    this.setState({
      [fildName]: value,
    })
  }

  handleSign = async () => {
    const { name, email, password, fullName } = this.state

    try {
      await firebase.register(name, email, password)
      await firebase.addQuote(fullName)
      this.props.history.push('/dashboard')
    } catch (error) {
      // eslint-disable-next-line no-undef
      alert(error.message)
    }
  }

  render() {
    return (
      <FormWrapper>
        <div className={styles.form}>
          <Input
            value={this.state.fullName}
            placeholder="Full Name"
            handleChange={this.handleChange('fullName')}
            name="fullName"
          />
          <Input value={this.state.email} placeholder="Email" handleChange={this.handleChange('email')} name="email" />
          <Input value={this.state.name} placeholder="name" handleChange={this.handleChange('name')} name="name" />
          <Input
            value={this.state.password}
            placeholder="Password"
            handleChange={this.handleChange('password')}
            name="password"
            type="password"
          />
          <Button handleClick={this.handleSign}>Sing us</Button>
        </div>
        <div className={styles.bottomField}>
          <p>
            Have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </FormWrapper>
    )
  }
}

RegisterPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(RegisterPage)
