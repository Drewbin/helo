import React, { Component } from 'react';
import axios from 'axios';

import noImage from '../Logos/no_image.jpg'

export default class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            author: '',
            pic: '',
            title: '',
            image: '',
            content: '',
            loading: true,
        }
    }
    componentDidMount() {
        axios.get(`/api/post/${ this.props.match.params.id }`).then( res => {
            setTimeout( () => this.setState({ ...res.data, loading: false }), 500)
        })
    }

    render() {
        let imgSrc = this.state.image ? this.state.image : noImage;
        return (
            <div>
                {!this.state.loading && this.state.title
                ?
                <div>
                    <div>
                        <h2> {this.state.title} </h2>
                        <div>
                            <p>by {this.state.author}</p>
                            <img src={this.state.pic} alt='author' />
                        </div>
                    </div>
                    <div>
                        <div style={{ backgroundImage: `url('${imgSrc}')` }} alt='post' ></div>
                        <p> {this.state.content} </p>
                    </div>
                </div>
                :
                !this.state.loading
                ?
                <div>
                    <h2> Oops! </h2>
                    <p> Looks like this post doesn't exist anymore </p>
                </div>
                :
                <div>

                </div>
                }
            </div>
        )
    }
}