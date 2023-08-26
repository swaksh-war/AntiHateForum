import React, { Component } from 'react'

export default class CreateBlog extends Component {
    constructor(props) { 
        super(props);

        this.state = {
            title : '',
            content : ''
        }
    }
    hadnleChange = (e) => {
        const { name , value } = e.target;
        this.setState({
            [name] : value,
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { title, content } = this.state;
        const token = localStorage.getItem('token');

        try{
            const response = await fetch("http://localhost:8000/create_post/", {
                method : 'POST',
                headers : { 
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body : JSON.stringify({ title, content }),
            });

            if (response.ok) {
                console.log(response)
            }
            else {
                const errorData = await response.json();
                console.error('Create Post Error : ', errorData);
            }
        } catch (error) {
            console.error('Create Post Error', error);
        }
    };

    render() {
        const { title, content } = this.state;
        return (
        <div>
            <h2>Create New Post</h2>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value = {title}
                        onChange = {this.hadnleChange}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        name="content"
                        value={content}
                        onChange={this.hadnleChange}
                        required
                    />
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
        )
    }
}
