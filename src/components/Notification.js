import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

class Notification extends React.Component {
  render() {
    const notification = this.props.notification
    let style = null

    if (notification.style === 'success') {
      style = {
        color: 'green',
        border: 'solid',
        padding: 10,
        borderWidth: 1
      }
    } else if (notification.style === 'error') {
      style = {
        color: 'red',
        border: 'solid',
        padding: 10,
        borderWidth: 1
      }
    }


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