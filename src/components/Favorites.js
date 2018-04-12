import React from 'react'
import { Button } from 'semantic-ui-react'

class Favorites extends React.Component {

  state = {
    all: true,
    liked: false,
    own: false
  }

  render() {

    const buttons = (
      <Button.Group>
        <Button>Tykätyt</Button>
        <Button>Kaikki</Button>
        <Button>Omat</Button>
      </Button.Group>
    )


    return (
      <div>{buttons}</div>
    )
  }
}

export default Favorites