import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new post
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('image', image);

            await axios.post('http://localhost:3001/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

        } catch (error) {
            console.error('Error creating post:', error);
        }

        setTitle('');
        setContent('');
        setImage(null);
    };

    return (
        <>
            <div className="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="createLabel">Create a New Blog</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label" style={{fontWeight: '500', color: '#000'}}>Title</label>
                                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{fontWeight: '500', color: '#000'}}>Description</label>
                                    <textarea value={content} rows={5} className="form-control" onChange={(e) => setContent(e.target.value)}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{fontWeight: '500', color: '#000'}}>Thumbnail</label>
                                    <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                                <div className="d-flex justify-content-end align-items-center">
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success ms-3">Create</button>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostForm;
