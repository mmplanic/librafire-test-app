import { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/api';
import './posts.scss';

let isSubscribed

export default function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        isSubscribed = true;
            getAllPosts().then(res => res.json()).then(data => {
                if (isSubscribed) {
                    setPosts(data.data.posts);
                    console.log(data.data);
                }
            })

        return () => {
            isSubscribed = false;
        }
    }, []);

  
    return (
        <div className='posts-page' >
            Posts Page
        </div>
    );
}