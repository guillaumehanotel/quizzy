import React, {useEffect, useState} from 'react';
import './Home.scss'
import {useStore, useGlobalState} from '../../storeProvider';
import {fetchGenres} from "../../utils/requests";
import {Genre} from "../../models/Genre";

const Home: React.FC = () => {
    const dispatch = useStore();
    const state = useGlobalState();
    const [genres, setGenres] = useState<Genre[]>([]);

    const getGenres = async () => {
        const genres: Genre[] = await fetchGenres();
        console.log(genres)
        setGenres(genres);
    };

    useEffect(() => {
        getGenres()
    }, []);

    return (
        <div>
            HOME
            <ul>
                {genres.map(genre => (
                    <li key={genre.id}>
                        <p>{genre.name}</p>
                        <img src={genre.picture_url} alt=""/>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Home;
