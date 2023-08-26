import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class navbar extends Component {
  render() {
    let { loggedIn } = this.props
    return (
        <nav className='main-navbar'>
            <h3>Forum</h3>
            <ul className='navbar-ul'>
                <li className="nav-link"><Link to="/">Home</Link></li>
                <li className="nav-link"><Link to="/post">Post</Link></li>
                {loggedIn && <li className="nav-link"><Link to="/create">Create Post</Link></li>}
                <li className="nav-link"><Link to="/login">Register/Login</Link></li>
            </ul>
        </nav>
    )
  }
}

