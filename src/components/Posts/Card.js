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
        <>
            <div
                className="relative p-4 m-4 w-72 h-72 shadow-xl rounded-lg border border-transparent hover:border-blue-400 hover:cursor-pointer transition-all"
                onClick={handleOpenPostDetails}>

                <h2 className="text-xl text-center font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 break-words">{truncatedDescription}</p>
                {!finished ?
                    <>
                        <button
                            onClick={(e) => { handleOpenPopin(e); e.stopPropagation(); }}
                            className="action-button absolute bottom-4 right-4">
                            Donner un avis
                        </button>
                        <PopinAdvice
                            advice={null}
                            isOpen={isPopinOpen}
                            onClose={handleClosePopin}
                            onSubmit={handleSubmitAdvice}
                        />
                    </>
                    :
                    <>
                        {advice ?
                            <>
                                <button
                                    onClick={(e) => { handleOpenPopin(e); e.stopPropagation(); }}
                                    className="action-button absolute bottom-4 right-4">
                                    Modifier l'avis
                                </button>
                                <PopinAdvice
                                    advice={advice}
                                    isOpen={isPopinOpen}
                                    onClose={handleClosePopin}
                                    onSubmit={handleSubmitAdvice}
                                />
                            </>

                            :
                            <div className="absolute bottom-4 right-4 bg-red-500 text-white font-bold py-2 px-4 rounded">
                                Avis non donné
                            </div>
                        }
                    </>
                }
            </div>
            <PostDetails
                isOpen={isPostDetailsOpen}
                onClose={handleClosePostDetails}
                post={{ title, description, advice }}
            />
        </>
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