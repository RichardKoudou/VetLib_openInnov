import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { environment } from "../../environment";

function Create_Demande({user}) {
    const token = Cookies.get("token");
    const navigate = useNavigate();
    const [, setMessage] = useState('');
    const [Animals, setAnimals] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        user_id: user.id,
    });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.post(`${environment.apiUrl}animals/allAnimalsByUser`, {
                    user_id: user.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAnimals(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const create_post_form = (e) => {
        e.preventDefault();
        axios.post(`${environment.apiUrl}posts/upload`, formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                navigate('/demandes/list');
            })  
            .catch(error => {
                let errorMessage = error.response.data.errors[0].message;
                setMessage(errorMessage);
            });
    };


    return (
        <main className="flex justify-center flex-col items-center">
            <h1 className="text-4xl mb-6">Demande</h1>
            <form onSubmit={create_post_form} className="w-full max-w-md">
                <div className="form-group mb-4">
                    <label htmlFor="title" className="block text-gray-700">Titre :</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="Animal" className="block text-gray-700">Animal:</label>
                    <select
                        id="Animal"
                        name="Animal"
                        value={formData.Animal}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="">Sélectionner un Animal</option>
                        {Animals.map(animal => (
                            <option key={animal.id} value={animal.species}>{animal.species}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="description" className="block text-gray-700">Description :</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button type="submit" className="m-0 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Envoyer</button>
            </form>
        </main>
    );
}

export default Create_Demande;
