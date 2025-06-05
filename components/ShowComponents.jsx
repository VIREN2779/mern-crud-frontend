import React, { useState, useEffect } from 'react';
import postService from '../services/postService';
import '../App.css';
import UpdateModelComponent from './UpdateModelComponent';
import { useNavigate } from 'react-router-dom';

function ShowComponents() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState({});
  const fetchPosts = async () => {
    setPosts(await postService.getPosts());
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  console.log(posts.data);

  const deletePost = async (id, e) => {
    // For checking Id is called or not
    // alert(id);
    const confirmed = window.confirm(
      `Are you sure you want to delete this post?`
    );
    if (confirmed) {
      var response = await postService.deletePost(id);
      if (response.data.success === true) {
        alert('deleted successfully...');
        document.getElementById(id).parentElement.parentElement.remove();
      } else {
        alert(response.data.message, 'Error delete');
      }
    }
  };

    const handleAddDataClick = () => {
      navigate('/show');
    };
  return (
    <>
      <div className='App'>
        <h1>DataBase</h1>
        <button
          style={{ margin: '20px' }}
          type='button'
          className='btn btn-primary'
          onClick={handleAddDataClick}
        >
          Add Data
        </button>

        {posts.data !== undefined && posts.data.data.length > 0 && (
          <table style={{ width: '100%' }} border='1'>
            <thead>
              <th>Title</th>
              <th>Date</th>
              <th>Image</th>
              <th>Status</th>
            </thead>
            <tbody>
              {posts.data.data.map((post) => (
                <tr>
                  <td>{post.title}</td>
                  <td>{post.date}</td>
                  <td>
                    <img
                      alt=''
                      src={'http://localhost:8080/api/postImages/' + post.image}
                      style={{ width: '100px', height: '50px' }}
                    />
                  </td>
                  <td style={{ padding: '20px' }}>
                    <UpdateModelComponent
                      id={post._id}
                      title={post.title}
                      date={post.date}
                    />
                    <button
                      style={{ marginLeft: '20px' }}
                      type='button'
                      className='btn btn-danger'
                      id={post._id}
                      onClick={(e) => deletePost(post._id, e)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ShowComponents;
