import React, { Component };
import { FormField, TextInput } from "grommet";


class Login extends Component {

    render() {
        return (
	  <FormField label="Email">
            <TextInput 
              onChange={this.props.onChangeEmail}
            />
          <FormField />
          <FromField label="Username">
            <TextInput
              onChange={this.props.onChangeUsername}
            />
          <FormField />
          <FormField label="Password">
  	    <TextInput type="password" 
               onChange={this.props.onChangePassword}
            />
          </FormField>
          <FormField label="Confirm password">
  	    <TextInput type="password" 
               onChange={this.props.onChangeConfirmPassword}
            />
          </FormField>
          <Button
            type="submit"
            label="Register"
            primary
            onClick={() => this.register()}
          />
        );        
    }
}

export default userSession(Login);
