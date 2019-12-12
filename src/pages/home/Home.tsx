import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as M from 'materialize-css';
import { fetchGenres } from '../../utils/requests';
import './Home.scss';
import { Genre } from '../../models/Genre';
import { useUserState, useUserDispatch } from '../../providers/UserProvider';
import { HAS_JUST_REGISTERED } from '../../config/actions/userActions';

/**
 * Homepage.
 */
const Home: React.FC = () => {
  const history = useHistory();
  const state = useUserState();
  const dispatch = useUserDispatch();
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    getGenres();
    displayAlertIfNeeded();
  }, []);

  const getGenres = async () => {
    const allGenres: Genre[] = await fetchGenres();
    setGenres(allGenres);
  };

  const displayAlertIfNeeded = () => {
    if (state.hasJustRegistered) {
      M.toast({ html: 'Inscription effectuée avec succès, vous pouvez à présent jouer à Quizzy !' });
      dispatch({ type: HAS_JUST_REGISTERED, payload: false });
    }
  };

  return (
    <div>
      <h5 className="ml-4 mt-4 mb-4">{genres.length ? 'Choisissez un thème parmi ceux proposés' : "Il n'y a aucun genre disponible. Veuillez réessayer ultérieurement." }</h5>
      <div className="genres-container m-auto">
        {
          genres.length
            ? genres.map((genre) => (
              <div className="genre-parent-item mb-1 hoverable" key={`genre_${genre.id}`}>
                <div
                  className="genre-item valign-wrapper"
                  key={genre.id}
                  onClick={() => history.push(`game/${genre.id}`)}
                  onKeyPress={() => history.push(`game/${genre.id}`)}
                  tabIndex={0}
                  role="button"
                  style={{
                    backgroundImage: `url(${genre.picture_url})`,
                  }}
                >
                  <p>{genre.name}</p>
                </div>
              </div>
            ))
            : null
        }
      </div>
    </div>
  );
};

export default Home;
