import { useEffect, useState } from 'react';
import Container from '../../components/container/container';
import FilterBar from '../../components/filter bar/filter bar';
import PostCard from '../../components/post card/post card';
import { getAllPosts } from '../../services/api';
import './posts.scss';

let isSubscribed

let temp = [
    {
        id: 0,
        title: "Dobar dan",
        body: "orem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque iaculis lorem quis venenatis faucibus. Vivamus nec massa sit amet tellus porta tristique vel et metus.",
        author: "someone"
    },
    {
        id: 1,
        title: "dsfasf",
        body: "orem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque iaculis lorem quis venenatis faucibus. Vivamus nec massa sit amet tellus porta tristique vel et metus.",
        author: "someone else"
    },
    {
        id: 2,
        title: "hghggh",
        body: "orem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque iaculis lorem quis venenatis faucibus. Vivamus nec massa sit amet tellus porta tristique vel et metus.",
        author: "no one"
    },
    {
        id: 3,
        title: "cvbcvbbcv",
        body: "orem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque iaculis lorem quis venenatis faucibus. Vivamus nec massa sit amet tellus porta tristique vel et metus.",
        author: "pera"
    },
    {
        id: 4,
        title: "ujmnmnbv",
        body: "orem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque iaculis lorem quis venenatis faucibus. Vivamus nec massa sit amet tellus porta tristique vel et metus.",
        author: "mika"
    },
    {
        id: 4,
        title: "xcscdd",
        body: "orem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque iaculis lorem quis venenatis faucibus. Vivamus nec massa sit amet tellus porta tristique vel et metus.",
        author: "zika"
    }
]
export default function Posts() {

    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
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
        
        setPosts(temp);
        let keys = Object.keys(temp[0]);
        setOptions(keys.map(key => { return ({ value: key, text: key.toUpperCase() }) }));
        setSelect(keys[0]);

        return () => {
            isSubscribed = false;
        }
    }, []);
    
    function filterPosts(array, value, key) {
        setFilteredPosts(value !== '' ? array.filter(post => post[key].toString().toLowerCase().includes(value.toString().toLowerCase())) : array);
    }

    useEffect(() => {
        filterPosts(posts, search, select);
    }, [posts, search, select])


  
    return (
        <div className='posts-page' >
            <div className='posts-page__results'>Posts fount: {filteredPosts.length}</div>
            <Container>
                <FilterBar>
                    <FilterBar.Search value={ search } onChange={ e=>setSearch(e.target.value) }/>
                    <FilterBar.Select value={select} options={options} onChange={ e=>setSelect(e.target.value) }/>
                </FilterBar>

                <div className='posts-page__list'>
                    {filteredPosts.map((post, i) => {
                        const { title, body, id } = post;
                        const link = {
                            text: "Read More",
                            attributes: {
                                to: `posts/${id}`,
                                exact: true
                            }
                        }
                        return (
                            <PostCard key={`card-${i}`} title={title} text={body} link={link} />
                        )
                    }) }
                </div>

            </Container>
        </div>
    );
}