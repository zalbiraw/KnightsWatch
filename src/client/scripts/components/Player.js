import React, { PropTypes }       from 'react'
import { Match, Miss, Redirect }  from 'react-router'

import Loading  from './loading'
import Create   from './Player/Create'
import Profile  from './Player/Profile'

class Player extends React.Component {

  constructor() {

    super()

    this.state = {}

    this.getPlayer = this.getPlayer.bind(this)
    this.setPlayer = this.setPlayer.bind(this)

    this.getRedirect = this.getRedirect.bind(this)
    this.setRedirect = this.setRedirect.bind(this)

  }

  componentWillMount() {

    const props     = this.props,
          player    = props.player,
          functions = props.functions

    const success = json => this.setPlayer(json)

    const failure = res => {

      if (res.status == 404)
        functions.setError({ code: 404, message: res.statusText })

    }

    if (player) {

      functions.get('/api/secure/scout/player/' + player, {
        success: {
          callback: success,
          preventNotification: true
        },
        failure: {
          callback: failure,
          preventNotification: true
        }
      })

    }

  }

  render() {

    const props       = this.props,
          player      = this.getPlayer(),
          redirect    = this.getRedirect(),
          setRedirect = this.setRedirect,
          render      = props.render,
          functions   = props.functions

    if (redirect)
      return <Redirect to = {'/player/' + redirect} />

    if (props.player) {

      if (!player)
        return <Loading />

      return <Profile player = {player} />

    }

    return (
      <Create
        functions = {{
          ...functions,
          setRedirect
        }}
      />
    )
  }

  getPlayer() {
    return this.state.player
  }

  setPlayer(player) {
    this.setState({ player })
  }

  getRedirect() {
    return this.state.redirect
  }

  setRedirect(redirect) {
    this.setState({ redirect })
  }

}

Player.propTypes = {
  functions: PropTypes.object.isRequired
}

export default Player
