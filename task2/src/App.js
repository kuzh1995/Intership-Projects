import React from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import './App.css'

function App() {
  return (
      <div className="container">
        <div className='row'>
          <div className='col-12 mt-3 mb-4'>
            <div className='blog-header d-flex justify-content-between align-items-center'>
              <h2 className='m-0'>Blog List</h2>
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#createModal">
                Create Blog
              </button>
            </div>
          </div>
          <PostList />
        </div>
        <PostForm />
      </div>
  );
}

export default App;
