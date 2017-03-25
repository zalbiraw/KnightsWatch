import React, { PropTypes } from 'react'

const Loading = () => (
  <div className = 'loading'>
    <div className = 'preloader-wrapper big active'>

      <div className = 'spinner-layer spinner-blue gold-circle'>
        <div className = 'circle-clipper left'>
          <div className = 'circle'></div>
        </div>
        <div className = 'gap-patch'>
          <div className = 'circle'></div>
        </div>
        <div className = 'circle-clipper right'>
          <div className = 'circle'></div>
        </div>
      </div>

      <div className = 'spinner-layer spinner-red gold-circle'>
        <div className = 'circle-clipper left'>
          <div className = 'circle'></div>
        </div>
        <div className = 'gap-patch'>
          <div className = 'circle'></div>
        </div>
        <div className = 'circle-clipper right'>
          <div className = 'circle'></div>
        </div>
      </div>

      <div className = 'spinner-layer spinner-yellow green-circle'>
        <div className = 'circle-clipper left'>
          <div className = 'circle'></div>
        </div>
        <div className = 'gap-patch'>
          <div className = 'circle'></div>
        </div>
        <div className = 'circle-clipper right'>
          <div className = 'circle'></div>
        </div>
      </div>

      <div className = 'spinner-layer spinner-green green-circle'>
        <div className = 'circle-clipper left'>
          <div className = 'circle'></div>
        </div>
        <div className = 'gap-patch'>
          <div className = 'circle'></div>
        </div>
        <div className = 'circle-clipper right'>
          <div className = 'circle'></div>
        </div>
      </div>

    </div>
  </div>
)

export default Loading
