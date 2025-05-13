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
        <div className="flex flex-col w-100 items-start justify-center">
            {posts.length === 0 ?
                <>
                    <div className="flex flex-col items-center justify-center w-[100vw] h-[90vh]">
                        <img
                            src="https://veraicona.hypotheses.org/files/2017/11/confused-travolta-original-pulp-fiction-animated-gif.gif"
                            alt="Aucune demande à traiter"
                            className="rounded-lg"
                        />
                        <h1 className="text-4xl text-center mt-3">Aucune demande actuellement...</h1>
                    </div>
                </>

                :
                <>
                    <h1 className="text-4xl text-center w-[100vw] mt-3 font-semibold">{finished ? 'Vos avis' : 'Demandes à traiter'}</h1>
                    <div className="flex flex-wrap justify-evenly">
                        {posts.map(post => (
                            <SquareCard key={post.id} id={post.id.toString()} title={post.title}
                                        description={post.description} user={user} finished={finished}
                                        advice={post.advice}/>
                        ))}
                    </div>
                </>
            }
                </div>
                );
            }

export default PostList;