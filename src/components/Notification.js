import React from 'react'
import { connect } from 'react-redux'

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
      return (
        <div style={style}>
          {notification.message}
        </div>
      )
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