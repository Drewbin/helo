import React, { Component } from 'react';

export default class Auth extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange( input, value ) {
        this.setState({
            [input] : value,
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
                    <button> Login </button>
                </div>

                <div>
                    <button> Register </button>
                </div>
            </div>
        )
    }
}