import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function CreateComment() {
    const { id } = useParams(); // Fetch the post id from the URL using useParams
    const [comment, setComment] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComment(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/post_comment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ comment, post: id }) // Use the fetched id
            });

            if (response.ok) {
                console.log('Commented successfully');
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error(errorData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="comment"
                    value={comment}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Comment</button>
            </form>
        </div>
    );
}

export default CreateComment;
