// src/components/Auth/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { environment } from "../../environment";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../Contexts/UserContext';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${environment.apiUrl}auth/login`, formData)
            .then(response => {
                Cookies.set('token', response.data.token.token);
                setUser(response.data.user); // Set the user context
                navigate('/');
            })
            .catch(error => {
                setMessage("L'email ou le mot de passe sont incorrects !");
            });
    };

    return (
        <main className="pt-28 flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-6">Se connecter</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="form-group mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button type="submit" className="m-0 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Login</button>
            </form>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </main>
    );
}

export default Login;