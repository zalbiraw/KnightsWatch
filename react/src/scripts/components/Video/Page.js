import React, { PropTypes } from 'react'

const Page = ({ video }) => (
  <div className = 'video-page'>
    {console.log(video)}
  </div>
)

Page.propTypes = {
  video: PropTypes.object.isRequired
}

export default Page
