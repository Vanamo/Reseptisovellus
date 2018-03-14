import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

class Notification extends React.Component {
  render() {
    const notification = this.props.notification

    if (notification.message) {
      if (notification.style === 'success') {
        return (
          <Message success>
            {notification.message}
          </Message>
        )
      } else if (notification.style === 'error') {
        return (
          <Message error>
            {notification.message}
          </Message>
        )
      }
    } else {
      return (
        <div></div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)