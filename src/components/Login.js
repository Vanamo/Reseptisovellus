import React from 'react'
import { connect } from 'react-redux'
import { Container, Form, Button } from 'semantic-ui-react'
import { loginUser } from './../reducers/userReducer'

class Login extends React.Component {

  state = {
    username: '',
    password: ''
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.user) {
      this.props.history.push('/')
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const user = ({
      username: this.state.username,
      password: this.state.password
    })

    this.props.loginUser(user)
    this.setState({ username: '', password: '' })

  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <Container>
        <h2>Kirjaudu reseptisovellukseen</h2>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>käyttäjätunnus</label>
            <input
              type="text"
              name="username"
              value={this.username}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>salasana</label>
            <input
              type="password"
              name="password"
              value={this.password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit">kirjaudu</Button>
        </Form>
      </Container>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  { loginUser }
)(Login)