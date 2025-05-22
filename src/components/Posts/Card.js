import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PopinAdvice from '../Veterinarian/PopinAdvice';
import PostDetails from './PostDetails';
import axios from 'axios';
import { environment } from '../../environment';
import Cookies from 'js-cookie';

function SquareCard({ id, title, description, user, finished, advice }) {
    const [isPopinOpen, setIsPopinOpen] = useState(false);
    const [isPostDetailsOpen, setIsPostDetailsOpen] = useState(false);
    const token = Cookies.get('token');

    const truncatedDescription = description.length > 150 ? description.substring(0, 150) + '...' : description;

    const handleOpenPopin = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsPopinOpen(true);
    };

    const handleClosePopin = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsPopinOpen(false);
    };

    const handleOpenPostDetails = () => {
        setIsPostDetailsOpen(true);
    };

    const handleClosePostDetails = () => {
        setIsPostDetailsOpen(false);
    };

    const handleSubmitAdvice = async (advice) => {
        try {
            const response = await axios.post(`${environment.apiUrl}advices/upload`, { comment: advice, doctorId: user.id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            await axios.put(`${environment.apiUrl}posts/update/${id}`, { advice_id: response.data.id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
            console.error("Erreur lors de la soumission de l'avis", error);
        }
    };

    return (
        <div className="flex flex-col h-full p-4 bg-white rounded-lg shadow-lg border border-transparent hover:border-blue-400">
            <h2 className="text-xl text-center font-semibold mb-4">{title}</h2>
            <p className="text-gray-600 break-words flex-grow mb-4">{truncatedDescription}</p>
            <div className="mt-auto w-full">
                {!finished ? (
                    <button
                        onClick={(e) => { handleOpenPopin(e); e.stopPropagation(); }}
                        className="action-button w-full text-center">
                        Donner un avis
                    </button>
                ) : (
                    <>
                        {advice ? (
                            <button
                                onClick={(e) => { handleOpenPopin(e); e.stopPropagation(); }}
                                className="action-button w-full text-center">
                                Modifier l'avis
                            </button>
                        ) : (
                            <div className="w-full text-center py-2 px-4 bg-red-500 text-white rounded">
                                Avis non donné
                            </div>
                        )}
                    </>
                )}
            </div>
            <PopinAdvice
                advice={null}
                isOpen={isPopinOpen}
                onClose={handleClosePopin}
                onSubmit={handleSubmitAdvice}
            />
            <PostDetails
                isOpen={isPostDetailsOpen}
                onClose={handleClosePostDetails}
                post={{ title, description, advice }}
            />
        </div>
    );
}

SquareCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    finished: PropTypes.bool.isRequired,
    advice: PropTypes.object,
};

export default SquareCard;