import React from 'react'
import { Container, Form, Button } from 'semantic-ui-react'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <Container>
      <h2>Kirjaudu</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>käyttäjätunnus</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>salasana</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Form.Field>
        <Button type="submit">kirjaudu</Button>
      </Form>
    </Container>
  )
}

export default LoginForm