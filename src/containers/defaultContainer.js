import React, { Component } from 'react'
import superagent from 'superagent/lib/client'

const api_key = ''
const api_endpoint = ''

let state = {
}

export default WrappedComponent =>
  class withSubscriptions extends Component {
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
        <WrappedComponent/>
      )
    }
  }
  