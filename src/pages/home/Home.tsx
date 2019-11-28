import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { fetchGenres } from '../../utils/requests';
import './Home.scss';
import { ROUTES } from '../../config/routes';
import { Genre } from '../../models/Genre';
import { useGlobalState } from '../../storeProvider';

const Home: React.FC = () => {
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
    getGenres();
  }, []);

  return (
    <div>
      <h5 className={"ml-4 mt-4 mb-4"}>Choisissez un thème parmi ceux proposés</h5>
      <div className="genres-container m-auto">
        {genres ? genres.map((genre) => (
          <div className="genre-parent-item mb-1 hoverable">
            <div
              className="genre-item valign-wrapper"
              key={genre.id}
              onClick={() => openModal(genre.id)}
              style={{
                backgroundImage: `url(${genre.picture_url})`
              }}>
              <p>{genre.name}</p>
            </div>
          </div>
        )) : <p>No Genres found</p>}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modal-content">
          <span className="cross w500" onClick={closeModal}>X</span>
          {state.isLogged ?
            <div className="row mt-3">
              <div className="col s6">
                <Link className={"btn btn-public rounded full-width full-height"} to={`${ROUTES.GAME}/${selectedGenreId}`}>Rejoindre une partie publique</Link>
              </div>
              <div className="col s6 full-height valign-wrapper">
                <Link className={"btn quizzy-blue rounded full-width full-height"} to={`${ROUTES.GAME}/${selectedGenreId}`}>Créer une partie privée</Link>
              </div>
            </div>
            : <div className="m-auto center-align mt-1">
              <p className="w500 mb-4">
                Pour accéder aux parties, veuillez
  vous connecter.
              </p>
              <Link to={ROUTES.LOGIN} className={"btn quizzy-blue rounded"}>Se connecter</Link>
            </div>
          }
        </div>
      </Modal>
    </div>
  );
};

export default Home;

const customStyles = {
  content: {
    borderRadius: '13px',
    top: '55%',
    left: '55%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-65%, -65%)',
    display: 'flex',
    alignItems: 'center'
  },
};
