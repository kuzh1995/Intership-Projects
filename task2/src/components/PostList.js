import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className='grid_3 mb-4'>
            {posts.map((post) => (
                <div className='card shadow' key={post._id}>
                    {post.image && (
                        <div className='card_img' style={{backgroundImage: `url(data:image/png;base64,${arrayBufferToBase64(post.image.data)})`}}></div>
                    )}
                    <div className='card-body'>
                        <h4>{post.title}</h4>
                        <p>{post.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
