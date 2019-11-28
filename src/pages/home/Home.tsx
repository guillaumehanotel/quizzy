import React, {useEffect, useState} from 'react';
import './Home.scss'
import {useStore, useGlobalState} from '../../storeProvider';
import {fetchGenres} from "../../utils/requests";
import {Genre} from "../../models/Genre";
import {useHistory} from "react-router";
import Modal from 'react-modal';

const Home: React.FC = () => {
    const dispatch = useStore();
    const state = useGlobalState();
    const history = useHistory();
    const [genres, setGenres] = useState<Genre[]>([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedGenreId, setSelectedGenreId] = useState(0);

    const openModal = (genreId: number) => {
        setSelectedGenreId(genreId);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    const getGenres = async () => {
        const genres: Genre[] = await fetchGenres();
        setGenres(genres);
    };

    useEffect(() => {
        getGenres()
    }, []);

    return (
        <div>
            <p>Choisissez un thème parmi ceux proposés</p>
            <div className={"genres-container"}>
                {genres ? genres.map(genre => (
                    <div className={"genre-item"} key={genre.id} onClick={() => openModal(genre.id)}>
                        <img src={genre.picture_url} alt="" height={150} width={250}/>
                        <p>{genre.name}</p>
                    </div>
                )) : <p>No Genres found</p>}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}>
                <div className="modal-buttons">
                    <div className="btn btn-large btn-public" onClick={() => history.push("/room/" + selectedGenreId)}>Rejoindre une partie publique</div>
                    <div className="btn btn-large blue">Créer une partie privée</div>
                </div>
            </Modal>
        </div>
    )
};

export default Home;

const customStyles = {
    content: {
        borderRadius: '15px',
        top: '35%',
        left: '30%',
        right: '30%',
        bottom: '48%',
    }
};
