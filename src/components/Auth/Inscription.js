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
        <main className="pt-[7%] pb-8 flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md mb-8">
                <h1 className="text-3xl font-semibold text-center mb-6">S'inscrire</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="form-group">
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
                        <div className="form-group">
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
                        <div className="form-group">
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
                    </div>
                    <div className="space-y-4">
                        <div className="form-group">
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
                        <div className="form-group">
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
                    </div>
                    <div className="col-span-2">
                        <button type="submit" className="action-button w-full">S'inscrire</button>
                        {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
                        <p className="mt-4 text-center text-gray-600">
                            Déjà un compte ? 
                            <a href="/connexion" className="ml-1 text-blue-500 hover:text-blue-600">
                                Connectez-vous
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Inscription;