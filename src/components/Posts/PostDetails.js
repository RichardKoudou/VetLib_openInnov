import React from 'react';
import PropTypes from 'prop-types';

function PostDetails({ isOpen, onClose, post }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 h-96 max-w-full">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 m-2" onClick={(e) => { e.stopPropagation(); onClose(); }}>
                    <i className="fas fa-times"></i>
                </button>
                <div className="flex flex-col h-full">
                    <div className="mb-4 border-b pb-2">
                        <h2 className="text-xl text-center font-semibold">{post.title}</h2>
                    </div>
                    <div className="flex-grow mb-4 border-b pb-2 overflow-y-auto">
                        <p className="text-gray-600 break-words">{post.description}</p>
                    </div>
                    <div className="mt-2">
                        <p className="text-gray-600">{post.advice ? post.advice.comment : "Pas d'avis donné"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

PostDetails.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

export default PostDetails;