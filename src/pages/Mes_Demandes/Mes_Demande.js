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
        <main className="flex flex-col">
            <div className='text-4xl mt-2 text-center'>
                <h1>Mes demandes</h1>
            </div>
            <BtnBase nav='/demandes/create' name='Créer une demande' />

            <table className="bg-[#91D5BE] my-5">
                <thead>
                <tr className="rounded-tl">
                    <th className="py-5 rounded-tl">Date</th>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Modification</th>
                    <th>Réponse</th>
                    <th>Avis</th>
                </tr>
                </thead>
                <tbody>
                {posts.map(post => (
                    <tr key={post.id} className='bg-white'>
                        <td className=" py-5">{format(new Date(post.createdAt), 'd/M/y')}</td>
                        <td>{post.title}</td>
                        <td>{post.description}</td>
                        <td className="text-center">
                            {post.advice_id ? (
                                <span className="font-bold text-red-500">✖</span>
                            ) : (
                                <button className="bg-[#91D5BE] p-2 px-4 rounded" onClick={() => openPopup(post)}>Modifier</button>
                            )}
                        </td>
                        <td className="flex items-center justify-center py-5">
                            {post.adviceId ? (
                                <div className="bg-emerald-500 p-2 px-4 rounded">
                                    <i className="fa fa-check"></i>
                                </div>
                            ) : (
                                <span className="font-bold text-red-500">✖</span>
                            )}
                        </td>
                        <td>
                            {post.advice ?
                                <p>{post.advice.comment}</p>
                                :
                                null
                            }
                        </td>
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
        </main>
    );
}

export default Mes_Demande;