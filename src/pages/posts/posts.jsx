import { useEffect } from 'react';
import './posts.scss';

export default function Posts() {

    useEffect(() => {
        //effect
        return () => {
            //cleanup
        }
    }, [])
    
    return (
        <div className='posts-page' >
            Posts Page
        </div>
    );
}