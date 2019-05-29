import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateUser, logout } from '../../ducks/reducer';

class Nav extends Component {
    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        axios.get('/api/me').then(res => {
            this.props.updateUser(res.data);
        })
    }

    logout() {
        axios.post('/api/logout').then(res => {
            this.props.dispatch({ type: logout });
            this.props.history.push('/')
        })
    }

    render() {
        if (this.props.location.pathname !== '/') {
        return (
            <div>
                <div>
                    <div style={{ backgroundImage: `url('${this.props.image}')`}} />
                    <p>{this.props.username}</p>
                </div>

                <div>
                    <button onClick={ () => this.props.history.push('/dashboard') }> Home </button>
                    <button onClick={ () => this.props.history.push('/new') }> New Post </button>
                </div>
            <button onClick={this.logout}> Logout </button>
            </div>
        )
        } else {
            return null
        }
    }
}

function mapStateToProps(state) {
    return state;
}

export default withRouter(connect(mapStateToProps, { updateUser, logout })(Nav));

/*
'Home' should navigate to the Dashboard view.
'New Post' should navigate to the New Post view.
'Logout' should navigate to the Auth view.

*/