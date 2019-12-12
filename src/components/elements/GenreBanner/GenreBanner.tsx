import React, { useEffect, useState } from 'react';
import { fetchGenre } from '../../../utils/requests';
import { Genre } from '../../../models/Genre';
import './GenreBanner.scss';
import { useGameState } from '../../../providers/GameProvider';

/**
 * Display the current music category.
 */
const GenreBanner: React.FC = () => {
  const { genreId } = useGameState();
  const [genre, setGenre] = useState<Genre|null>(null);

  const getGenre = async () => {
    const fetchedGenre: Genre = await fetchGenre(genreId);
    setGenre(fetchedGenre);
  };

  useEffect(() => {
    if (genreId) {
      getGenre();
    }
  }, [genreId]);

  return (
    <>
      {
        genre
          ? (
            <div
              className="genre-item valign-wrapper"
              style={{
                backgroundImage: `url(${genre.picture_url})`,
              }}
            >
              <p>{genre.name}</p>
            </div>
          )
          : null
      }
    </>
  );
};

export default GenreBanner;
