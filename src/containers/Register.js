import React from 'react';
import { Authentication } from 'components';
import { connect } from 'react-redux';
import { registerRequest } from 'actions/authentication';

import { browserHistory } from 'react-router';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);    
    }
    
    handleRegister(id, pw, user_name) {
        return this.props.registerRequest(id, pw, user_name).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    Materialize.toast('Success! Please log in.', 2000);
                    browserHistory.push('/login');
                    return true;
                } else {
                    /*
                        ERROR CODES:
                            1: BAD USERNAME
                            2: BAD PASSWORD
                            3: USERNAME EXISTS
                    */
                    let errorMessage = [
                        'Exist User',
                        'Unvalid Email Format',
                        'Username Name Format',
						'Password is short'
                    ];
                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Authentication mode={false}
                    onRegister={this.handleRegister}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (id, pw, user_name) => {
            return dispatch(registerRequest(id, pw, user_name));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
