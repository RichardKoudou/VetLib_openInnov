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
        <main className="flex justify-center items-center min-h-screen p-8 bg-gray-50">
            <div className="card w-full max-w-md p-8">
                <h1 className="welcome-title text-center mb-8">Se connecter</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="block text-sm font-medium mb-2">Mot de passe:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <button type="submit" className="action-button w-full">Se connecter</button>
                </form>
                {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
                <p className="mt-4 text-center text-gray-600">
                    Pas encore de compte ? 
                    <a href="/inscription" className="ml-1 text-blue-500 hover:text-blue-600">
                        Inscrivez-vous
                    </a>
                </p>
            </div>
        </main>
    );
}

export default Login;