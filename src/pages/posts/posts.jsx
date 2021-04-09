import { useEffect, useState } from 'react';
import Container from '../../components/container/container';
import FilterBar from '../../components/filter bar/filter bar';
import PostCard from '../../components/post card/post card';
import { getAllPosts } from '../../services/api';
import './posts.scss';

let isSubscribed
export default function Posts() {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [select, setSelect] = useState('');
    const [options, setOptions] = useState([]);

    
    useEffect(() => {
        isSubscribed = true;
            // getAllPosts().then(res => res.json()).then(data => {
            //     if (isSubscribed) {
            //         const {posts:dataPosts} =  data.data ;
            //          if (dataPosts.length) {
            //              setPosts(dataPosts);
            //              setOptions(Object.keys(dataPosts[0]));
            //          }
            //     }
            //  })

        return () => {
            isSubscribed = false;
        }
    }, []);

    function filterPosts(array, value, key) {
        return value !== '' ? array.filter(post => post[key].toLowerCase().includes(value.toLowerCase())) : array;
    }
  
    return (
        <div className='posts-page' >
            <div className='posts-page__results'>Posts fount: {posts.length}</div>
            <Container>
                <FilterBar>
                    <FilterBar.Search value={ search } onChange={ e=>setSearch(e.target.value) }/>
                    <FilterBar.Select value={select} options={options} onChange={ e=>setSelect(e.target.value) }/>
                </FilterBar>

                <div className='posts-page__list'>
                    {filterPosts(posts, search, select).map(post => {
                        const { title, body, id } = post;
                        const link = {
                            text: "Read More",
                            attributes: {
                                to: `posts/${id}`,
                                exact: true
                            }
                        }
                        return (
                            <PostCard title={title} text={body} link={link} />
                        )
                    }) }
                </div>

            </Container>
        </div>
    );
}