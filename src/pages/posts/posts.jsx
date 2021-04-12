import './posts.scss';
import { useEffect, useState } from 'react';
import Container from '../../components/container/container';
import FilterBar from '../../components/filter bar/filter bar';
import Pagination from '../../components/pagination/pagination';
import PostCard from '../../components/post card/post card';
import { getAllPosts } from '../../services/api';
import Loader from '../../components/loader/loader';



let numberOfPostsPerPage = 11;
let isSubscribed = false;

export default function Posts() {

    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [select, setSelect] = useState('');
    const [options, setOptions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    const [loader, setLoader] = useState(true);

    useEffect(() => {
        isSubscribed = true;
        setLoader(true);
        getAllPosts(page, numberOfPostsPerPage).then(res => res.json()).then(data => {
            if (isSubscribed) {

                const { data: dataPosts = [], meta = {} } = data.data.posts;
                setTotalCount(meta.totalCount || 1);
                if (dataPosts.length) {
                    setPosts(dataPosts);
                    setOptions(Object.keys(dataPosts[0]).map((key, i) => {
                        if (i === 0 && !select) setSelect(key);
                        return {
                            value: key,
                            text: `Filter by ${key}`
                        }
                    }));
                }

                setLoader(false);
            }
        });
        
        return _=> {
            isSubscribed = false;
        }
        // eslint-disable-next-line
    }, [page]);
    
    function filterPosts(array, value, key) {
        setFilteredPosts(value !== '' ? array.filter(post => (key === 'user'? post[key].name : post[key]).toString().toLowerCase().includes(value.toString().toLowerCase())) : array);
    }

    useEffect(() => {
        filterPosts(posts, search, select);
    }, [posts, search, select]);

    const onChange = (num) =>  setPage(num);
  
    return (
        <div className='posts-page' >
            <div className='posts-page__results'>
                <Container>Posts found: {search !== '' ? filteredPosts.length : ''}</Container>
            </div>
            <Container>
                <FilterBar>
                    <FilterBar.Search value={ search } placeholder='search' onChange={ e=>setSearch(e.target.value) }/>
                    <FilterBar.Select value={select} options={options} placeholder='search by' onChange={ e=>setSelect(e.target.value) }/>
                </FilterBar>

                <div className='posts-page__list'>
                    {filteredPosts.map((post, i) => {
                        const { title, body, id } = post;
                        const link = {
                            text: "Read More →",
                            attributes: {
                                to: `posts/${id}`,
                                exact: true
                            }
                        }
                        return (
                            <PostCard key={`card-${i}`} title={title} text={body} link={link} className='posts-page__list-card' />
                        )
                    }) }
                </div>
                
                <Pagination arrows
                    current={page}
                    maxToShow={7}
                    onChange={onChange}
                    count={(totalCount ? Math.ceil(totalCount / numberOfPostsPerPage) : 1)}
                />
            </Container>
            <Loader isLoading={loader} />
        </div>
    );
}