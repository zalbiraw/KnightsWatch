import React, { PropTypes }       from 'react'
import { Match, Miss, Redirect }  from 'react-router'

import Loading  from './loading'
import Create   from './Video/Create'
import Page     from './Video/Page'

class Video extends React.Component {

  constructor() {

    super()

    this.state = {}

    this.getVideo = this.getVideo.bind(this)
    this.setVideo = this.setVideo.bind(this)

    this.getRedirect = this.getRedirect.bind(this)
    this.setRedirect = this.setRedirect.bind(this)

  }

  componentWillMount() {

    const props     = this.props,
          video     = props.video,
          functions = props.functions

    const success = json => this.setVideo(json)

    const failure = res => {

      if (res.status == 404)
        functions.setError({ code: 404, message: res.statusText })

    }

    if (video) {

      functions.get('/api/secure/scout/video/' + video, {
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
          video       = this.getVideo(),
          redirect    = this.getRedirect(),
          setRedirect = this.setRedirect,
          render      = props.render,
          functions   = props.functions

    if (redirect)
      return <Redirect to = {'/video/' + redirect} />

    if (props.video) {

      if (!video)
        return <Loading />

      return <Page video = {video} />

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

  getVideo() {
    return this.state.video
  }

  setVideo(video) {
    this.setState({ video })
  }

  getRedirect() {
    return this.state.redirect
  }

  setRedirect(redirect) {
    this.setState({ redirect })
  }

}

Video.propTypes = {
  functions: PropTypes.object.isRequired
}

export default Video
