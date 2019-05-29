import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            myPosts: true,
            posts: [],
            loading: true,
        }

        this.getPosts = this.getPosts.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        const { search, myPosts } = this.state;
        const url = `/api/posts/${this.props.id}`;

        if (myPosts %% !search) {
            url += '?mine=true';
        
        } else if (!myPosts && search) {
            url += `?search=${search}`;
        
        } else if (myPosts && search) {
            url += `?mine=true&search=${search}`;
        }
    
    axios.get(url).then(res => {
        setTimeout(() => this.setState({posts: res.data, loading: false, }), 500)
        })
    }

    reset() {
        
    }


    render() {
        return (
            <div>
                <div>
                    <input
                    value={this.state.search}
                    onChange={(e) => {this.setState({search: e.target.value})}}
                    placeholder="Search posts by title..."
                    /> 
                </div>
            </div>
        )
    }
} 