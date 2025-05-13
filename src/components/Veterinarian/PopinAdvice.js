import React, { useState } from 'react';
import PropTypes from 'prop-types';

function PopinAdvice({ advice, isOpen, onClose, onSubmit }) {
    let [comment, setComment] = useState(advice ? advice.comment : '');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(comment);
        onClose(e);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 max-w-full" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={(e) => { e.stopPropagation(); onClose(e); }}>
                    <i className="fas fa-times m-1"></i>
                </button>
                <h2 className="text-xl font-semibold mb-4">{advice ? "Modifier l'avis" : 'Donner un avis'}</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={comment}
                        onChange={(e) => { e.stopPropagation(); setComment(e.target.value); }}
                        placeholder="Écrire votre avis ici..."
                        required
                        className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
                    />
                    <button type="submit" className="bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-400">Soumettre</button>
                </form>
            </div>
        </div>
    );
}

PopinAdvice.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default PopinAdvice;