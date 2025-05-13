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
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl mb-4">Edit Demande</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={editedPost.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Description:</label>
                        <textarea
                            name="description"
                            value={editedPost.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-[#91D5BE] px-4 py-2 rounded mr-2">Enregistrer</button>
                        <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopinEditDemande;