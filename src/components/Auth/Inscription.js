import React, { useContext, useState } from 'react';
import axios from 'axios';
import { environment } from "../../environment";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../../Contexts/UserContext";

function Inscription() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        role: '',
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
        axios.post(`${environment.apiUrl}auth/register`, formData)
            .then(response => {
                axios.post(`${environment.apiUrl}auth/login`, {
                    email: formData.email,
                    password: formData.password
                }).then(response => {
                    setUser(response.data.user);
                    Cookies.set('token', response.data.token.token);
                    navigate('/');
                }).catch(error => {
                    console.error('Login error:', error);
                    setMessage("Login failed after registration.");
                });
            })
            .catch(error => {
                let errorMessage = error.response.data.errors[0].message;
                setMessage(errorMessage);
            });
    };

    return (
        <main className="pt-28 flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-6">S'inscrire</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="form-group mb-4">
                    <label htmlFor="first_name" className="block text-gray-700">Prénom:</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="last_name" className="block text-gray-700">Nom:</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="role" className="block text-gray-700">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="">Sélectionner un rôle</option>
                        <option value="ROLE_USER">Utilisateur</option>
                        <option value="ROLE_VETO">Vétérinaire</option>
                    </select>
                </div>
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
                <button type="submit" className="m-0 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Register</button>
            </form>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </main>
    );
}

export default Inscription;