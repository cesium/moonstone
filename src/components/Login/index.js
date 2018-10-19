import React from "react";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '1',
      password: '1',
    }
  }

  login(){
    console.log(this.state.username + " " + this.state.password);
  }

  render() {
      return (
        <div>
          <form>
            Username: <input
                        type="text"
                        onChange={(event,newValue) => this.setState({username : newValue})}
                      /><br/>
            Password: <input
                        type="password"
                        onChange={(event,newValue) => this.setState({password : newValue})}
                      /><br/>
          </form>
          <button onClick={() => this.login()}>Login</button>
        </div>
      )
  }
}

export default Login;
