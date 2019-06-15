import React, { Component } from 'react';
import axios from 'axios';

import noImage from '../Logos/no_image.jpg';
export default class Form extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            title: '',
            image: '',
            content: '',
        };

        this.submit = this.submit.bind(this);
    }

    submit() {
        axios.post('/api/post', this.state).then(res => {
            this.props.history.push('/dashboard')
        }).catch(err => {
            alert('You must log in to post.')
        })
    }

    render() {
        let imgSrc = this.state.image ? this.state.image : noImage;

        return (
            <div>
                <h2> New Post </h2>
                <div>
                    <p> Title: </p>
                    <input value={this.state.title} onChange={ (e) => this.setState({ title: e.target.value })} />
                </div>
                <div style={{ backgroundImage: `url('${imgSrc}')` }} alt='preview'></div>
                <div>
                    <p> Image URL: </p>
                    <input value={this.state.image} onchange={ (e) => this.setState({ image: e.target.value })} />
                </div>
                <div>
                    <p> Content </p>
                    <textarea value={this.state.content} onChange={ (e) => this.setState({ content: e.target.value })} />
                </div>
                <button onClick={this.submit}> Post </button>
            </div>
        )
    }
}