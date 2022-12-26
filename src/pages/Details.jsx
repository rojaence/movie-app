import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaDetails } from '@/api/index';
import { SnackbarContext } from '@/context/SnackbarContext';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';
import Skeleton from '@/components/Skeleton';
import '@/styles/details.scss';

function Details() {
  const [loading, setLoading] = useState(false);
  const { mediaType, mediaId } = useParams();
  const [mediaData, setMediaData] = useState(null);
  const snackbar = useContext(SnackbarContext);

  useEffect(() => {
    const getDetails = async () => {
      if (loading) return;
      try {
        setLoading(true);
        const data = await getMediaDetails({
          mediaType,
          mediaId
        });
        console.log(data);
        setMediaData(data);
      } catch (error) {
        snackbar.show({ message: error.message, color: 'error' });
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, []);

  if (loading || !mediaData) {
    return (
      <div className="details">
        <Skeleton width={300} height={450} className="details__poster" />
        <div className="details__body">
          <div className="rating">
            <Skeleton width={100} variant="rounded" />
          </div>
          <Skeleton className="details__title" />
          <Skeleton className="details__overview" height={300} />
        </div>
        <div className="genres">
          <Skeleton width={150} />
          <Skeleton width={150} />
          <Skeleton width={150} />
        </div>
      </div>
    );
  }

  return (
    <section className="details">
      {mediaData.poster_path ? (
        <img
          className="details__poster"
          src={`https://image.tmdb.org/t/p/w300${mediaData.poster_path}`}
          alt="Poster"
        />
      ) : (
        <Icon
          name="image"
          size={150}
          className="details__poster details__poster--empty"
          viewBox="-1 0 50 50"
        />
      )}
      <div className="details__body">
        <div className="rating">
          <Icon name="star" color="accent" className="rating__icon" />
          <span className="rating__value">
            {mediaData.vote_average || 'NR'}
          </span>
        </div>
        <h2 className="details__title">
          {mediaData.name || mediaData.title || ''}
        </h2>
        <p className="details__overview">{mediaData.overview || ''}</p>
      </div>

      <div className="genres">
        {mediaData.genres.map((genre) => (
          <Button text={genre.name} key={genre.id} variant="gradient" />
        ))}
      </div>
    </section>
  );
}

export default Details;
