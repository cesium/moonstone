import React, { Component } from 'react'
import superagent from 'superagent/lib/client'

const api_key = ''
const api_endpoint = ''

let state = {
    username: "",
}

export default WrappedComponent =>
  class userSession extends Component {
    
    state = { email: '', username: '', password: '', confirm_passwd: '' }

    onChangeEmail = event => {
      state={..., email: event.target.value };
      this.forceUpdate()
    }

    onChangeUsername = event => {
      state={..., username: event.target.value };
      this.forceUpdate()
    }

    onChangePassword = event => {
      state={..., password: event.target.value };
      this.forceUpdate()
    }

    onChangeConfirmPassword = event => {
      state={..., confirm_passwd: event.target.value };
      this.forceUpdate()
    }

    componentDidMount() {
      this.getUser()
    }

    onResponseInfo = response => {
      const { } = response.body
      state = { }
      this.forceUpdate()
    }

    getUser() {
      superagent
        .get(api_endpoint)
        .query()
        .then(this.onResponseInfo)
        .catch(error => console.error(error))
    }

    render() {
      return (
        <WrappedComponent
          onChangeEmail={this.onChangeEmail}
          onChangeUsername={this.onChangeUsername}/>
      )
    }
  }
  
