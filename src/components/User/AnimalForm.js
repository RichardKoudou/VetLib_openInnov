import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import { environment } from "../../environment";
import { UserContext } from "../../Contexts/UserContext";
import Cookies from "js-cookie";

function AnimalForm() {
    const [formData, setFormData] = useState({
        species: '',
        user_id: null
    });
    const token = Cookies.get('token');

    const [message, setMessage] = useState('');
    const [animals, setAnimals] = useState([]);
    const [, setLoading] = useState(true);
    const { user, addAnimal } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.user_id = user.id;
        addAnimal(formData)
            .then(() => {
                fetchAnimals();
            })
            .catch(error => {
                setMessage("Erreur lors de l'ajout de l'animal.");
            });
    };

    const onDeleteAnimal = (animalId) => {
        axios.delete(`${environment.apiUrl}animals/deleteAnimal/${animalId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            fetchAnimals();
        }).catch(error => {
            setMessage("Impossible de supprimer l'animal.");
        });
    };

    const fetchAnimals = () => {
        axios.post(`${environment.apiUrl}animals/allAnimalsByUser`, {
            user_id: user.id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setAnimals(response.data);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchAnimals();
    }, [user, token]);

    return (
        <div className='flex flex-col w-1/2'>
            <form onSubmit={handleSubmit} className="ml-4 max-w-md">
                <div className="form-group mb-4">
                    <label htmlFor="species" className="block text-gray-700">Espèce:</label>
                    <input
                        type="text"
                        id="species"
                        name="species"
                        value={formData.species}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button type="submit" className="m-0 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Enregistrer l'animal</button>
                {message && <p className="mt-4 text-red-500">{message}</p>}
            </form>
            {user && user.role === 'ROLE_USER' && animals.length > 0 && (
                <div className="mt-8 w-full max-w-md">
                    <h2 className="text-2xl text-center">Mes Animaux</h2>
                    <ul className="mt-2">
                        {animals.map(animal => (
                            <li key={animal.id}
                                className="mb-2 w-11/12 ml-4 flex justify-between items-center p-2 border border-gray-300 rounded-md">
                                <p><strong>Espèce:</strong> {animal.species}</p>
                                <button
                                    onClick={() => onDeleteAnimal(animal.id)}
                                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300">
                                    <i className='fa fa-trash'></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AnimalForm;