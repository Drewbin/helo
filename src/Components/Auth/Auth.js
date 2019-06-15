import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'

import { updateUser } from '../../ducks/reducer';

class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange( input, value ) {
        this.setState({
            [input] : value,
        })
    }

    login() {
        axios.post('/api/login', this.state).then(res => {
            this.props.updateUser(res.data);
            this.props.history.push('/dashboard');
        })
    }

    register() {
        axios.post('/api/register', this.state).then(res => {
            this.props.updateUser(res.data);
            this.props.history.push('/dashboard')
        })
    }

    render() {
        return (
            <div>
                <p> Helo </p>
                
                <div>
                    <p> Username: </p>
                    <input type='text' 
                    value={this.state.username}
                    onChange={ (e) => this.handleChange('username', e.target.value)} /> 
                </div>

                <div>
                    <p> Password: </p>
                    <input type='text'
                    value={this.state.password}
                    onChange={ (e) => this.handleChange('password', e.target.value)} />
                </div>
                <div>
                    <button onClick={this.login}> Login </button>
                </div>

                <div>
                    <button onClick={this.register}> Register </button>
                </div>
            </div>
        )
    }
}

export default connect(null, { updateUser })(Auth);