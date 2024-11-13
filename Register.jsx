import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isPassError, setIsPassError] = useState(false);

    const navigate = useNavigate();

    const validatePassword = () => {
        let isValid = true;
        setIsPassError(false);
        setError(null);

        if (!password) {
            setIsPassError(true);
            setError('Password is required');
            isValid = false;
        } else if (password.length < 8) {
            setIsPassError(true);
            setError('Password must be at least 8 characters long');
            isValid = false;
        } else if (!/[A-Z]/.test(password)) {
            setIsPassError(true);
            setError('Password must contain at least one uppercase letter');
            isValid = false;
        } else if (!/[a-z]/.test(password)) {
            setIsPassError(true);
            setError('Password must contain at least one lowercase letter');
            isValid = false;
        } else if (!/[0-9]/.test(password)) {
            setIsPassError(true);
            setError('Password must contain at least one number');
            isValid = false;
        } else if (!/[!@#$%^&*]/.test(password)) {
            setIsPassError(true);
            setError('Password must contain at least one special character');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        if (!validatePassword()) return;
        const userData = {
            username,
            password,
        };
        console.log('Sending data:', userData); // Log the data being sent
    
        try {
            const response = await axios.post('http://localhost:3001/chatify/signup',userData);
    
            if (response.status === 201) {
                navigate('/login');
            }   
        } catch (error) {
            console.error('Registration error:', error);
            if (error.response) {
                setError(error.response.data.message || 'An error occurred. Please try again.');
            } else {
                setError('Error: ' + error.message);
            }
        }
    };
    
    return (
        <div id="app">
            <div id="background"></div>
            <div id="logo" className="logo">
              <img src="data:image/png;base64,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" alt="Logo" className="logo-image" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
            </div>
            <div id="content">
                <div className="border">
                    <div className="head">
                        <h1 className="head-title" style={{ fontSize: '36px', fontStyle: 'italic', color: '#333333' }}>
                            Register Page
                        </h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label className="label" style={{ fontSize: '24px', fontStyle: 'italic', color: '#666666' }}>
                            Username:
                        </label>
                        <span style={{ marginRight: '100px' }}></span>
                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            style={{ fontSize: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #CCCCCC' }}
                            required
                        />
                        <br />
                        <br />
                        <label className="label" style={{ fontSize: '24px', fontStyle: 'italic', color: '#666666' }}>
                            Password:
                        </label>
                        <span style={{ marginRight: '105px' }}></span>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            style={{ fontSize: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #CCCCCC' }}
                            required
                        />
                        <br />
                        <br />
                        <label className="label" style={{ fontSize: '24px', fontStyle: 'italic', color: '#666666' }}>
                            Confirm Password:
                        </label>
                        <span style={{ marginRight: '20px' }}></span>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            style={{ fontSize: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #CCCCCC' }}
                            required
                        />
                        <br />
                        {confirmPassword && confirmPassword !== password && (
                            <div className="error" style={{ fontSize: '18px', color: '#FF0000' }}>
                                Passwords do not match.
                            </div>
                        )}
                        {isPassError && (
                            <div className="error" style={{ fontSize: '18px', color: '#FF0000' }}>
                                {error}
                            </div>
                        )}
                        <br />
                        <br />
                        <button
                            type="submit"
                            className="button"
                            style={{ fontSize: '24px', fontStyle: 'italic', backgroundColor: '#4CAF50', color: '#FFFFFF', padding: '15px 30px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
            <style>
                {`
                #app {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                }

                #background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: url("https://w0.peakpx.com/wallpaper/725/492/HD-wallpaper-anime-store.jpg");
                    background-repeat: no-repeat;
                    background-size: cover;
                    filter: blur(5px);
                    z-index: -1;
                }

                #logo {
                    position: absolute;
                    top: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1;
                }

                #content {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .border {
                    background: rgba(255, 255, 255, 0.5);
                    border: 1px solid #CCCCCC;
                    padding: 40px;
                    width: 800px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
                }

                .head {
                    margin-bottom: 40px;
                }

                .head-title {
                    color: #333333;
                    font-family: 'Arial', sans-serif;
                    font-size: 50px;
                    font-style: italic;
                    text-align: center;
                }

                .label {
                    margin-top: 20px;
                    color: #666666;
                    font-style: italic;
                }

                .error {
                    color: #FF0000;
                }

                .button {
                    font-size: 28px;
                    font-style: italic;
                    background-color: #4CAF50;
                    color: #FFFFFF;
                    padding: 20px 40px;
                    cursor: pointer;
                    margin-right: 10px;
                    border: none;
                }

                .button:hover {
                    background-color: #3e8e41;
                }
                `}
            </style>
        </div>
    );
};

export default Register;
