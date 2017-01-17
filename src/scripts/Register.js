import React from 'react'

import Menu from './components/menu'

export default class Register extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    return (
      <div>
        <Menu />
        <div className = 'container'>
          <form
            id        = 'register'
            onSubmit  = {this.handleSubmit}
          >
            <div className = 'row'>
              <div className = 'input-field col s6'>
                <label htmlFor = 'first'>Frist Name</label>
                <input
                  id          = 'first'
                  className   = 'validate'
                  type        = 'text'
                  name        = 'first'
                  required    = {true}
                />
              </div>
              <div className = 'input-field col s6'>
                <label htmlFor = 'last'>Last Name</label>
                <input
                  id          = 'last'
                  className   = 'validate'
                  type        = 'text'
                  name        = 'last'
                  required    = {true}
                />
              </div>
            </div>
            <div className = 'row'>
              <div className = 'input-field col s6'>
                <label htmlFor = 'password'>Password</label>
                <input
                  id          = 'password'
                  className   = 'validate'
                  type        = 'password'
                  name        = 'password'
                  required    = {true}
                />
              </div>
              <div className = 'input-field col s6'>
                <label htmlFor = 'confirm'>Confirm Password</label>
                <input
                  id          = 'confirm'
                  className   = 'validate'
                  type        = 'password'
                  name        = 'confirm'
                  required    = {true}
                />
              </div>
            </div>
            <div className = 'row'>
              <div className = 'input-field col s4'>
                <button
                  className = 'waves-effect waves-light btn'
                  type = 'submit'
                  name = 'submit'
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  getURLParam(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const target    = $(e.currentTarget),
          id        = this.getURLParam('id'),
          first     = target.find('input[name=first]')[0].value,
          last      = target.find('input[name=last]')[0].value,
          password  = target.find('input[name=password]')[0].value,
          confirm   = target.find('input[name=confirm]')[0].value

    if (password != confirm) {
      console.log('dont submit')
    } else {
      fetch('/api/register', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          id,
          first,
          last,
          password
        })
      }).then((res) => {
        if (res.status == 200) {
          console.log('good')
        }
      })
    }
  }
}
