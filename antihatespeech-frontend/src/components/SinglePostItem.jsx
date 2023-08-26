import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import CreateComment from './CreateComment';

function SinglePostItem(props) {
    const isLoggedIn = props.LoggedIn;
    console.log(isLoggedIn)
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    let dateObject = new Date(post.created_at);
    let postDate = dateObject.toLocaleString();

    useEffect(() => {
        async function fetchPostData() {
            try {
                setLoading(true);

                const response = await fetch(`http://localhost:8000/get_post/${id}/`);
                if (response.ok) {
                    const parsedData = await response.json();
                    setPost(parsedData.post);
                    setUser(parsedData.user);
                } else {
                    console.error('Failed to fetch API');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }

        async function fetchComments() {
            try {
                const response = await fetch(`http://localhost:8000/get_comments/${id}/`);
                if (response.ok){
                    const parsedData = await response.json();
                    setComments(parsedData.Comments);
                    console.log(comments);
                }
            } catch (err){
                console.error('Failed to fetch comments:', err);
            }
        }

        fetchPostData();
        fetchComments();
    }, [id]);

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    return (
        <>
            <div>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <span>{postDate}</span><br/>
                <span>By {user}</span>
            </div>
            <hr />
            <div>
                This is the Comment section
                <ul>
                    {comments.map((element, index) => (
                        <li key={index}>{element.comment}</li>
                    ))}
                </ul>
                {isLoggedIn && <CreateComment/>}
            </div>
        </>
    );
}

export default SinglePostItem;
