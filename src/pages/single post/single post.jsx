import { useEffect, useState } from 'react';
import CommentCard from '../../components/comment card/comment card';
import Container from '../../components/container/container';
import Loader from '../../components/loader/loader';
import Pagination from '../../components/pagination/pagination';
import { getSinglePost } from '../../services/api';
import './single post.scss';


let isSubscribed = false;
export default function SinglePost({ history, match }) {
    let { id } = match.params;
    id = Number(id);
    if ( isNaN(id) || !Number.isInteger(id) )  {
        history.push("/posts");
    }

    const [post, setPost] = useState({});
    const [postID, setPostID] = useState(id);
    const [count, setCount] = useState(id + 1);
    
    const [loader, setLoader] = useState(true);
    


    useEffect(() => {
        isSubscribed = true;
        setLoader(true);

        getSinglePost(postID).then(res => res.json()).then(data => {
            if (isSubscribed) {
                const { post: newPost } = data.data;
                if (newPost.id === null) {
                    setCount(postID - 1);
                    setPostID(postID - 1);
                    history.push(`/posts/${postID - 1}`);
                }
                else {
                    setPost(data.data.post);
                }
                setLoader(false);
            }
        });
        return () => {
            isSubscribed = false;
        }
        // eslint-disable-next-line
    }, [postID]);

    function onChange(newId) {
        setCount(newId + 1);
        setPostID(newId);
        history.push(`/posts/${newId}`)
    }

    function getAddress(post) {
        if (post?.user?.address) {
            const { city = "", street = "", zipcode = "" } = post.user.address;
            return `${city}, ${zipcode}, ${street}`;
        }
        return "";
    }


    return (
        <div className='single-post-page'>
            <Container>
                <Container className="single-post-page__page-group">
                    <h1 className='single-post-page__title'>{ post?.title }</h1>
                </Container>
                <Container className="single-post-page__page-group">
                    <p className='single-post-page__text'>{ post?.body }</p>
                </Container>
                <Container className="single-post-page__page-group">
                    <Pagination className="single-post-page__pagination"
                        arrows={{ left: "⬅Previous article", right: "Next article➡" }}
                        maxToShow={false}
                        current={postID}
                        count={count}
                        onChange={onChange}>
                    </Pagination>
                    <div className="single-post-page__author">
                        <div className="single-post-page__author-name">
                            Author name
                             <h2>{ post?.user?.name}</h2>
                        </div>
                        <div className="single-post-page__author-address">
                            Address
                            <h2>{getAddress(post)}</h2>
                        </div>
                    </div>
                </Container>
                <Container>
                    <div className="single-post-page__comment">Comments</div>
                    {
                        post?.comments?.data.map((comment, i) =>
                            <CommentCard key={`comment-${i}`}
                                className="single-post-page__comment-box"
                                title={comment.name}
                                text={comment.body} />)
                    }
                </Container>
            </Container>
            <Loader isLoading={loader} />
        </div>
    );
}