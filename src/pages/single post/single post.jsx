import './single post.scss';

export default function SinglePost({history, match}) {
    let { id } = match.params;
    
    id = Number(id);
    if ( isNaN(id) || !Number.isInteger(id) )  {
        history.push("/posts");
    }


    return (
        <div className='single-post-page'>
            Single Post Page id: {id}
        </div>
    );
}