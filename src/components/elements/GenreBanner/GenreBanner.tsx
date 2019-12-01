import React, { useEffect, useState } from 'react';
import { fetchGenre } from '../../../utils/requests';
import { Genre } from '../../../models/Genre';
import './GenreBanner.scss';

type Props = {
  genreId: string|number;
}

const GenreBanner: React.FC<Props> = ({ genreId }) => {
  const [genre, setGenre] = useState<Genre|null>(null);

  const getGenre = async () => {
    const fetchedGenre: Genre = await fetchGenre(genreId);
    console.log(fetchedGenre)
    setGenre(fetchedGenre);
  };

  useEffect(() => {
    getGenre();
  }, []);

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
