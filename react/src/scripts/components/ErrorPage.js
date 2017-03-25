import React from 'react'

const ErrorPage = ({ code, message }) => (
  <div id = 'not-found'>
    <div id = 'error-code'>{code}</div>
    <div id = 'error-message'>{message}</div>
  </div>
)

export default ErrorPage
