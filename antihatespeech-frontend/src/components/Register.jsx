import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            username : '',
            email : '',
            password : ''
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name] : value
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = this.state;
        try {
            const response = await fetch('http://localhost:8000/register/', {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({username, email, password}),
            });

            if(response.ok){
                const data = await response.json();
                console.log('User Register', data);

                this.setState({
                    username : '',
                    email : '',
                    password : ''
                });
            }
            else{
                const errorData = await response.json();
                console.error('Registration Error', errorData);
            }
        } catch(error){
            console.error('Registration Error', error);
        }
    };

    render() {
        const { username, email, password } = this.state;

    return (
        <div>
            <h2>Register User</h2>
            <form onSubmit={this.handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
                required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                required
                />
            </div>
            <button type="submit">Register</button>
            </form>
            <p>Already an user? <Link to="/login">Login Here</Link></p>
        </div>
        )
    }
}
