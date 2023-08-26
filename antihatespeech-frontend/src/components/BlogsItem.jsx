import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class BlogsItem extends Component {
    
    render() {
        let { index ,title, content, created_at } = this.props
        let dateObject = new Date(created_at);
        let postDate = dateObject.toLocaleString();
        return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
            <span>{postDate}</span>
            <br/>
            <Link to={`${index}/`}>Go to Post</Link>
        </div>
        )
    }
}
