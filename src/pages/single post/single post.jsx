import { useEffect, useState } from 'react';
import { getSinglePost } from '../../services/api';
import './single post.scss';


let isSubscribed = false;
export default function SinglePost({ history, match }) {
    const [post, setPost] = useState({});
    let { id } = match.params;
    
    id = Number(id);
    if ( isNaN(id) || !Number.isInteger(id) )  {
        history.push("/posts");
    }

    useEffect(() => {
        isSubscribed = true;
            getSinglePost(id).then(res => res.json()).then(data => {
                if (isSubscribed) {
                    setPost(data.data.post);
                }
            })

        return () => {
            isSubscribed = false;
        }
    }, []);


    return (
        <div className='single-post-page'>
            Single Post Page id: {post.id}
        </div>
    );
}