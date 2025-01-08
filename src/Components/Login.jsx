import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Login() {
    const navigate = useNavigate();

    const initialState = {
        username: '',
        password: ''
    };

    const [input, setInput] = useState(initialState);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateInputs = () => {
        let formErrors = {};

        if (!input.username.match(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/)) {
            formErrors.username = 'Username must include uppercase letters and numbers.';
        }
        if (!input.password.match(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/)) {
            formErrors.password = 'Password must include uppercase letters and numbers.';
        }
        return Object.keys(formErrors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateInputs()) {
            try {
                const response = await axios.post('http://localhost:8000/login', {
                    username: input.username,
                    password: input.password,
                });
    
                if (response.status === 200) {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
    
                    const decodedToken = jwtDecode(token);
                    console.log('Decoded Token:', decodedToken);
    
                    const role = decodedToken.role;
                    localStorage.setItem('user', JSON.stringify(response.data.user.role));
    
                    setSuccessMessage('Login successful!');
                    setErrorMessage('');
    
                    setTimeout(() => {
                        if (role === 'admin') {
                            navigate('/AdminPanel');
                        } else {
                            navigate('/');
                        }
                        window.location.reload();
                    }, 1500);
                }
            } catch (error) {
                setErrorMessage(
                    error.response ? error.response.data.message : 'An error occurred during login. Please try again later.'
                );
                setSuccessMessage('');
            }
        } else {
            setErrorMessage('Validation failed. Please check your inputs.');
            setSuccessMessage('');
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center pt-20 bg-gray-100">
            {successMessage && (
                <div className="mb-4 p-4 text-green-700 bg-green-100 rounded-md">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
                    {errorMessage}
                </div>
            )}
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-700">Login</h1>
                    <p className="text-sm text-gray-500">Login to access your account</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="form-field">
                            <input
                                name="username"
                                placeholder="Enter username"
                                type="text"
                                className="input w-full px-4 py-2 border border-gray-300 rounded-md"
                                value={input.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-field">
                            <input
                                name="password"
                                placeholder="Enter Password"
                                type="password"
                                className="input w-full px-4 py-2 border border-gray-300 rounded-md"
                                value={input.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
