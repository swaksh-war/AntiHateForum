import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Blogs from './components/Blogs';
import CreateBlog from './components/CreateBlog';
import SinglePostItem from './components/SinglePostItem';
import Loader from './components/Loader';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    return (
        <>
            <Router>
                <Navbar loggedIn={isLoggedIn}/>
                <Routes>
                    <Route exact path="/" element={<Loader/>} />
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/register" element={<Register/>}/>
                    <Route exact path="/post" element={<Blogs/>}/>
                    <Route exact path="/create" element={<CreateBlog/>}/>
                    <Route exact path="/post/:id" element={<SinglePostItem LoggedIn={isLoggedIn}/>}/>
                </Routes>
                {isLoggedIn ? <div><Logout/></div> : <div> User not Logged in Please Log in </div>}
            </Router>
        </>
    );
}

export default App;
