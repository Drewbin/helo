import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component {
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
        let { myPosts } = this.state;
        let url = 'api/posts';

        if (myPosts) {
            url += '?mine=true'
        }
        axios.get(url).then(res => {
            this.setState({ posts: res.data, loading: false, ssearch: '' })
        })
    }


    render() {
        let posts = this.state.posts.map( (elem) => {
            return <Link to={`/post/${elem.post_id}`} key={elem.post_id} >
                <div>
                    <h3> {elem.title} </h3>
                    <div>
                        <p> by {elem.author_username} </p>
                        <img src={elem.pic} alt='Author' />
                    </div>
                </div>
            </Link>
        })
        return (
            <div>
                <div>
                    <div><center>
                        <input
                        value={this.state.search}
                        onChange={(e) => {this.setState({search: e.target.value})}}
                        placeholder="Search posts by title..."
                        />

                        <img onClick={this.getPosts} alt='Search' />

                        <button onClick={this.reset} id='dash-reset'> Reset </button>
                        </center>
                    </div>
                    
                    <div>
                        <p> My Posts </p>
                        <input 
                        checked={this.state.myPosts}
                        onChange={ () => this.setState({ myPosts: !this.state.myPosts }, this.getPosts)}
                        type='checkbox'
                        />
                    </div>
                </div>
                <div>
                    {!this.state.loading ? posts : <div />}
                </div>
            </div>
        );
    }
}