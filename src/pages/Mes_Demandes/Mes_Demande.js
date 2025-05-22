import './Mes_Demande.css';
import BtnBase from "../../components/btn_base/btn_base";
import Cookies from "js-cookie";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { environment } from '../../environment';
import { format } from 'date-fns';
import PopinEditDemande from "../../components/Posts/PopinEditDemande";

function Mes_Demande({ user }) {
    const [posts, setPosts] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const token = Cookies.get("token");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.post(`${environment.apiUrl}posts/allPostsByUser`, {
                    user_id: user.id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [token]);

    const openPopup = (post) => {
        setCurrentPost(post);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setCurrentPost(null);
    };

    const savePost = (editedPost) => {
        setPosts(posts.map(post => post.id === editedPost.id ? editedPost : post));
    };

    return (
        <div className="demands-container">
            <h1 className="demands-title">Mes demandes</h1>
            <BtnBase className="action-button" nav='/demandes/create' name='Créer une demande' />

            <table className="demands-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Modification</th>
                        <th>Réponse</th>
                        <th>Avis</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td>{format(new Date(post.createdAt), 'd/M/y')}</td>
                            <td>{post.title}</td>
                            <td>{post.description}</td>
                            <td className="text-center">
                                {post.advice_id ? (
                                    <span className="text-red-500">✖</span>
                                ) : (
                                    <button className="edit-button" onClick={() => openPopup(post)}>
                                        Modifier
                                    </button>
                                )}
                            </td>
                            <td className="text-center">
                                {post.adviceId ? (
                                    <span className="text-green-500">✓</span>
                                ) : (
                                    <span className="text-red-500">✖</span>
                                )}
                            </td>
                            <td>{post.advice?.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PopinEditDemande
                post={currentPost}
                isOpen={isPopupOpen}
                onClose={closePopup}
                onSave={savePost}
            />
        </div>
    );
}

export default Mes_Demande;