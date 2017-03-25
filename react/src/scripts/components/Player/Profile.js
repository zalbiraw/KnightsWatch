import React, { PropTypes } from 'react'

const Profile = ({ player }) => (
  <div className = 'player-profile'>

    <div className = 'row name'>

      <span className = 'first'>
        {player.first}
      </span>

      <span className = 'last'>
        {player.last}
      </span>

    </div>

    <div className = 'row'>
      <div className = 'col s6'>
        Position
      </div>
      <div className = 'col s6'>
        {player.position}
      </div>
    </div>

    <div className = 'row'>
      <div className = 'col s6'>
        Team
      </div>
      <div className = 'col s6'>
        {player.team}
      </div>
    </div>

    <div className = 'row'>
      <div className = 'col s6'>
        Weight
      </div>
      <div className = 'col s6'>
        {player.weight}
      </div>
    </div>

    <div className = 'row'>
      <div className = 'col s6'>
        Height
      </div>
      <div className = 'col s6'>
        {player.height}
      </div>
    </div>

  </div>
)

Profile.propTypes = {
  player: PropTypes.object.isRequired
}

export default Profile
