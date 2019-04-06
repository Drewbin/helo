import React, { Component } from 'react';

export default class Auth extends Component {
    render() {
        return (
            <div>
                <p> Helo </p>
                
                <div>
                    <p> Username: </p>
                    <input type='text' /> 
                </div>

                <div>
                    <p> Password: </p>
                    <input type='text' />
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