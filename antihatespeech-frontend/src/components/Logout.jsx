import React, { Component } from 'react';

export default class Logout extends Component {
    handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                localStorage.removeItem('token');
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error('Logout Error: ', errorData);
            }
        } catch (error) {
            console.error('Logout Error: ', error);
        }
    };

    render() {
        return (
            <div>
                <button onClick={this.handleLogout}>LogOut</button>
            </div>
        );
    }
}
