import React from 'react'

export default class Dialog extends React.Component {

  renderButtons(props) {
    switch(props.type) {
      case 'confirmation':
        return this.renderConfirmation(props.handler)

      default:
        return null
    }
  }

  renderConfirmation(handler) {
    return (
      <div className = 'modal-footer'>
        <label className = 'modal-action waves-effect btn-flat' onClick = {handler}>
          Confirm
        </label>
        <label className = 'modal-action modal-close waves-effect btn-flat'>
          Cancel
        </label>
      </div>
    )
  }

  render() {
    const props   = this.props,
          buttons = props.buttons

    return (
      <div id = {props.id} className = 'modal'>
        <div className = 'modal-content'>
          <h4>{props.title}</h4>
          <p>{props.body}</p>
        </div>
        {this.renderButtons(props)}
      </div>
    )
  }
}
