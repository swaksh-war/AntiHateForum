import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            error : ''
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name] : value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;

        try {
            const response = await fetch('http://localhost:8000/login/', {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                this.setState({ error : ''});
                console.log(token);
                window.location.reload();
            }
            else {
                const errorData = await response.json();
                this.setState({ error :  errorData.error });
            }
        } catch(error) {
            console.error('Login Error: ', error);
        }
    };

    render() {
        const {username, password, error } = this.state;
        return (
            <div>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
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
                        <label>Password:</label>
                        <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>Not an user? <Link to="/register">Register Here</Link></p>
            </div>
        );
    }
}
