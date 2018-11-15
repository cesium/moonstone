import React, { Component } from 'react'
import superagent from 'superagent/lib/client'

const api_key = ''
const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzYWZpcmEiLCJleHAiOjE1NDQ3MTE1MDEsImlhdCI6MTU0MjI5MjMwMSwiaXNzIjoic2FmaXJhIiwianRpIjoiYjE1Y2Y3NTAtMzQzNi00NDUxLWExMjAtZGM1Y2NkOWNkYzZiIiwibmJmIjoxNTQyMjkyMzAwLCJzdWIiOiIxIiwidHlwIjoiYWNjZXNzIn0.dVlx-TL5f0_g5s-oUUIcX-XDMl3ofatzNbWPJdlBrI-q_y00RNpcUlnZh6xxMUB_S6zfse7uSPjSIlAYi_9tJw"
const api_endpoint = 'https://sei19-safira.herokuapp.com/api/v1/user'

let state = {
  email: ''
}

export default WrappedComponent =>
  class userInfo extends Component {
    componentDidMount() {
      this.getUser()
    }

    onResponseInfo = response => {
      console.log(response.body)
      const { email } = response.body
      state = { email }
      this.forceUpdate()
    }

    getUser() {
      superagent
        .get(api_endpoint)
        .set('Authorization','Bearer ' + token)
        .then(this.onResponseInfo)
        .catch(error => console.error(error))
    }

    render() {
      return (
        <WrappedComponent email={state.email} />
      )
    }
  }
  