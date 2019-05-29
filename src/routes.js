import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from './Components/Auth/Auth';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import Post from './Components/Post/Post';

export default (

    <Switch>
        <Route path='/' exact component={Auth} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/new' component={Form} />
        <Route path='/post/:postid' component={Post} />

        <Redirect to='/' />
    </Switch>
)