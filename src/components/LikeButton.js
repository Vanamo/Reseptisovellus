import React from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'

const LikeButton = ({ onClick, color, likes }) => (
  <div>
    <Button as='div' labelPosition='right'>
      <Button onClick={onClick} color={color}>
        <Icon name='heart' />
      </Button>
      <Label as='a' basic color={color} pointing='left'>{likes}</Label>
    </Button>
  </div>
)

export default LikeButton