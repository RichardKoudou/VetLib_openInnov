import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { environment } from '../environment';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            axios.post(`${environment.apiUrl}auth/profile`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setUser(response.data);
                setLoading(false);
            }).catch(err => {
                setError('Failed to load user profile');
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [Cookies.get('token')]);

    const addAnimal = async (animalData) => {
        const token = Cookies.get('token');
        if (!token) throw new Error('No token found');
        const response = await axios.post(`${environment.apiUrl}animals/uploadAnimals`, animalData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    };

    return (
        <UserContext.Provider value={{ user, setUser, loading, error, addAnimal }}>
            {children}
        </UserContext.Provider>
    );
};