import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMediaDetails, getRecommendations } from '@/api/index';
import { generateSkeletons } from '@/utils';
import { SnackbarContext } from '@/context/SnackbarContext';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';
import Skeleton from '@/components/Skeleton';
import CardSkeleton from '@/components/CardSkeleton';
import SlideGroup from '@/containers/SlideGroup';
import Card from '@/components/Card';
import '@/styles/details.scss';

function Details() {
  const [loading, setLoading] = useState(false);
  const { mediaType, mediaId } = useParams();
  const [mediaData, setMediaData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const detailsSection = useRef(null);
  const snackbar = useContext(SnackbarContext);

  const mapCardItems = (data) => {
    const mapItems = data.map((item) => ({
      id: item.id,
      element: (
        <Link to={`/details/${mediaType}/${item.id}`} className="link">
          <Card
            data={{
              id: item.id,
              title: item.title || item.name,
              image: item.poster_path
                ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                : '',
              mediaType
            }}
          />
        </Link>
      )
    }));
    return mapItems;
  };

  useEffect(() => {
    const getDetails = async () => {
      if (loading) return;
      try {
        setLoading(true);
        const data = await getMediaDetails({
          mediaType,
          mediaId
        });
        const aditionalContent = await getRecommendations({
          mediaType,
          mediaId
        });
        aditionalContent.results.sort((a, b) => b.popularity - a.popularity);
        setMediaData(data);
        setRecommendations(aditionalContent.results);
      } catch (error) {
        snackbar.show({ message: error.message, color: 'error' });
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    getDetails();
  }, [mediaType, mediaId]);

  if (loading || !mediaData) {
    return (
      <div className="details" ref={detailsSection}>
        <Skeleton
          width={300}
          height={525}
          className="details__poster details__poster--empty"
        />
        <div className="details__body">
          <div className="rating">
            <Skeleton width={100} variant="rounded" />
          </div>
          <Skeleton className="details__title" />
          <Skeleton className="details__overview" height={150} />
          <div className="genres">
            <Skeleton width={150} />
            <Skeleton width={150} />
          </div>
        </div>
        <section className="recommendations">
          <h2 className="recommendations__title">Recommendations</h2>
          <SlideGroup
            items={generateSkeletons(5, <CardSkeleton />)}
            className="similar-content"
          />
        </section>
      </div>
    );
  }

  return (
    <section className="details" ref={detailsSection}>
      {mediaData.poster_path ? (
        <img
          className="details__poster"
          src={`https://image.tmdb.org/t/p/w400${mediaData.poster_path}`}
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
      <section className="details__body">
        <div className="rating">
          <Icon name="star" color="accent" className="rating__icon" size={28} />
          <span className="rating__value">
            {mediaData.vote_average.toFixed(2) || 'NR'}
          </span>
        </div>
        <h2 className="details__title">
          {mediaData.name || mediaData.title || ''}
        </h2>
        <p className="details__overview">{mediaData.overview || ''}</p>
        <div className="genres">
          {mediaData.genres.map((genre) => (
            <Button text={genre.name} key={genre.id} variant="gradient" />
          ))}
        </div>
      </section>
      <section className="recommendations">
        <h2 className="recommendations__title">Recommendations</h2>
        <SlideGroup
          items={mapCardItems(recommendations)}
          className="similar-content"
        />
      </section>

      {mediaData.backdrop_path && (
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${mediaData.backdrop_path})`
          }}
          className="backdrop-image"
        />
      )}
    </section>
  );
}

export default Details;
