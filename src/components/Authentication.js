import React from 'react';
import { Link } from 'react-router';

class Authentication extends React.Component {
      constructor(props) {
           super(props);
           this.state = {
             email: "",
             password: "",
			 user_name: ""
          };
          this.handleChange = this.handleChange.bind(this);
		  this.handleLogin = this.handleLogin.bind(this);
		  this.handleRegister = this.handleRegister.bind(this);
		  this.handleKeyPress = this.handleKeyPress.bind(this);
        }
		
		handleKeyPress(e){
		   if(e.charCode==13) {
              if(this.props.mode) {
                this.handleLogin();
              } else {
                this.handleRegister();
             }
          }	
		}
	    
        handleChange(e) {
           let nextState = {};
           nextState[e.target.name] = e.target.value;
           this.setState(nextState);
        }

        handleLogin() {
           let id = this.state.email;
           let pw = this.state.password;
           
           this.props.onLogin(id, pw).then(
              (success) => {
                 if(!success) {
                    this.setState({
                        password: ''
                    });
                 }
              }
           );
        }
        handleRegister() {
           let id = this.state.email;
           let pw = this.state.password;
           let user_name = this.state.user_name;

           this.props.onRegister(id, pw, user_name).then(
              (result) => {
                 if(!result) {
                    this.setState({
                        email: '',
                        password: '',
						user_name: ''
                    });
                 }
               }
           );
        }
 

	
	render() {
        	const inputBoxes = (
            <div>
                <div className="input-field col s12 username">
                    <label>Email</label>
                    <input
                    name="email"
                    type="text"
                    className="validate" 
                    onChange={ this.handleChange }
                    value={ this.state.email }
                 />
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                    name="password"
                    type="password"
                    className="validate"
                    onChange={ this.handleChange }
					onKeyPress={ this.handleKeyPress }
                    value={ this.state.password }
                />
                </div>
            </div>
        );
        	const inputBoxes_for_Register = (
			<div>
				<div className="input-field col s12">
                    <label>Name</label>
                    <input
                    name="user_name"
                    type="text"
                    className="validate" 
                    onChange={ this.handleChange }
                    value={ this.state.user_name }
                 />
			  </div>
			</div>
		);
		const loginView = (
            <div>
                <div className="card-content">
                    <div classname="row">
                        { inputBoxes }
                        <a className="waves-effect waves-light btn"
                            onClick={this.handleLogin}>SUBMIT</a>
                    </div>
                </div>


                <div className="footer">
                    <div className="card-content">
                        <div className="right" >
                        New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>

            </div>
        );

        const registerView = (
          <div className="card-content">
                <div className="row">
                    { inputBoxes }
					{ inputBoxes_for_Register }
                    <a className="waves-effect waves-light btn"
                        onClick={this.handleRegister}>CREATE</a>
                </div>
            </div>
        );

		return (
            <div className="container auth">
                <Link className="logo" to="/">DONGJIN</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>
                    {this.props.mode ? loginView : registerView }
                </div>
            </div>
        );
    }
}

Authentication.propTypes = {
    mode: React.PropTypes.bool,
    onLogin: React.PropTypes.func,
    onRegister: React.PropTypes.func
};


Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => { console.error("login function not defined"); },
    onRegister: (id, pw) => { console.error("register function not defined"); }
};

export default Authentication;
