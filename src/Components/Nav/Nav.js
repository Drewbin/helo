import React, { Component } from 'react';

export default class Nav extends Component {
    constructor(props) {
        super(props)


    }

    render() {
        return (
            <div>

                <div>
                    <button onClick={ () => this.props.history.push('/dashboard') }> Home </button>
                    <button onClick={ () => this.props.history.push('/new') }> New Post </button>
                    <button onClick={ () => this.props.history.push('/') }> Logout </button>
                </div>

            </div>
        )
    }
}

/*
'Home' should navigate to the Dashboard view.
'New Post' should navigate to the New Post view.
'Logout' should navigate to the Auth view.

*/