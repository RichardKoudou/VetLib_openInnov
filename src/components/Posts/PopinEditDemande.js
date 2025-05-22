import React, { useState, useEffect } from 'react';

const PopinEditDemande = ({ post, isOpen, onClose, onSave }) => {
    const [editedPost, setEditedPost] = useState(post || { title: '', description: '' });

    useEffect(() => {
        setEditedPost(post || { title: '', description: '' });
    }, [post]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPost({ ...editedPost, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedPost);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Modifier votre demande</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 mb-2">Titre:</label>
                        <input
                            type="text"
                            name="title"
                            value={editedPost.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 mb-2">Description:</label>
                        <textarea
                            name="description"
                            value={editedPost.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                        <button type="submit" className="action-button w-full sm:w-auto order-2 sm:order-1">
                            Enregistrer
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="w-full sm:w-auto px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors order-1 sm:order-2">
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopinEditDemande;