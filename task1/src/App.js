import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('User registered successfully!');
      } else {
        alert(`Registration failed: ${data.error || 'Internal Server Error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  

  return (
    <>
      <section className="contact-from pt-4">
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-5 mx-auto">
              <div className="form-wrapper">
                <div className="row">
                  <div className="col-md-12">
                    <h4>Registration form</h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label style={{fontWeight: '500', color: '#000'}}>Full name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                          name="fullName"
                          value={userData.fullName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                      <label style={{fontWeight: '500', color: '#000'}}>Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          name="email"
                          value={userData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                      <label style={{fontWeight: '500', color: '#000'}}>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Your Password"
                          name="password"
                          value={userData.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
