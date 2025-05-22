import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { environment } from '../../environment';
import Cookies from "js-cookie";
import SquareCard from "../Posts/Card";

function PostList({user, finished}) {
    const [posts, setPosts] = useState([]);
    const token = Cookies.get("token");

    useEffect(() => {
        const fetchPostsNoAdvices = async () => {
            try {
                const response = await axios.get(`${environment.apiUrl}posts/allPostsNoAdvice`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        const fetchPostsAdvices = async () => {
            try {
                const response = await axios.post(`${environment.apiUrl}posts/allPostsByVeto`, {
                        user_id: user.id
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                    }
                }
                );
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        finished ? fetchPostsAdvices() : fetchPostsNoAdvices();
    }, [token, finished]);

    return (
        <div className="flex flex-col w-full pt-20 px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[80vh]">
                    <img
                        src="https://veraicona.hypotheses.org/files/2017/11/confused-travolta-original-pulp-fiction-animated-gif.gif"
                        alt="Aucune demande à traiter"
                        className="rounded-lg w-full max-w-[300px] sm:max-w-[400px]"
                    />
                    <h1 className="text-2xl sm:text-3xl md:text-4xl text-center mt-6">Aucune demande actuellement...</h1>
                </div>
            ) : (
                <>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold mb-8">
                        {finished ? 'Vos avis' : 'Demandes à traiter'}
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
                        {posts.map(post => (
                            <SquareCard 
                                key={post.id}
                                id={post.id.toString()}
                                title={post.title}
                                description={post.description}
                                user={user}
                                finished={finished}
                                advice={post.advice}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default PostList;