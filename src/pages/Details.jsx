import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getMediaDetails,
  getRecommendations,
  getPersonCredits
} from '@/api/index';
import { generateSkeletons, splitDate, removeDuplicateId } from '@/utils';
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
  const [aditionalContent, setAditionalContent] = useState([]);
  const detailsSection = useRef(null);
  const snackbar = useContext(SnackbarContext);

  const aditionalContentTitle = {
    movie: 'Recommendations',
    tv: 'Recommendations',
    person: 'Known by'
  };

  const mediaTypeLink = {
    movie: 'movies',
    tv: 'tvshows'
  };

  const mapCardItems = (data) => {
    const mapItems = data.map((item) => ({
      id: item.id,
      element: (
        <Link to={`/details/${item.media_type}/${item.id}`} className="link">
          <Card
            data={{
              id: item.id,
              title: item.title || item.name,
              image: item.poster_path
                ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                : '',
              mediaType: item.media_type || ''
            }}
          />
        </Link>
      )
    }));
    return mapItems;
  };

  const formatDate = (date) => {
    const { day, month, year } = splitDate(date);
    return `${month} ${day}, ${year}`;
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
        let aditional = [];
        if (mediaType === 'person') {
          const movieCredits = await getPersonCredits({
            mediaType: 'movie',
            personId: mediaId
          });
          const tvCredits = await getPersonCredits({
            mediaType: 'tv',
            personId: mediaId
          });
          aditional = movieCredits.crew.concat(tvCredits.crew);
        } else {
          const recData = await getRecommendations({
            mediaType,
            mediaId
          });
          aditional = recData.results;
        }
        aditional.sort((a, b) => b.popularity - a.popularity);
        setMediaData(data);
        setAditionalContent(removeDuplicateId(aditional));
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
          height="100%"
          className="details__poster details__poster--empty"
        />
        <div className="details__body">
          <Skeleton className="details__title" />
          {mediaType !== 'person' && (
            <>
              <div className="rating">
                <Skeleton width={100} variant="rounded" />
              </div>
              <div className="subtitle">
                <Skeleton width={100} variant="rounded" />
              </div>
              <div className="tagline">
                <Skeleton variant="rounded" />
              </div>
            </>
          )}
          <Skeleton className="details__overview" height={150} />
          {mediaType !== 'person' && (
            <div className="genres">
              <Skeleton width={150} />
              <Skeleton width={150} />
            </div>
          )}
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
      {mediaData.poster_path || mediaData.profile_path ? (
        <img
          className="details__poster elevation-1"
          src={`https://image.tmdb.org/t/p/w400${
            mediaData.poster_path || mediaData.profile_path
          }`}
          alt="Poster"
        />
      ) : (
        <div className="details__poster details__poster--alt elevation-1">
          <Icon name="image" size={150} viewBox="-1 0 50 50" />
        </div>
      )}
      <section className="details__body">
        {mediaType !== 'person' && (
          <>
            <div className="rating">
              <Icon
                name="star"
                color="accent"
                className="rating__icon"
                size={28}
              />
              <span className="rating__value">
                {mediaData.vote_average
                  ? mediaData.vote_average.toFixed(2)
                  : 'NR'}
              </span>
            </div>
            <div className="subtitle">
              <span className="date">
                {(mediaData.release_date &&
                  formatDate(mediaData.release_date)) ||
                  (mediaData.first_air_date &&
                    formatDate(mediaData.first_air_date))}
              </span>
            </div>
            {mediaData.tagline && (
              <i className="tagline">{mediaData.tagline}</i>
            )}
          </>
        )}
        <h2 className="details__title">
          {mediaData.name || mediaData.title || ''}
        </h2>
        <p className="details__overview">
          {mediaData.overview || mediaData.biography || ''}
        </p>
        {mediaType !== 'person' && mediaData.genres && (
          <div className="genres">
            {mediaData.genres.map((genre) => (
              <Link
                className="link"
                to={`/${mediaTypeLink[mediaType]}/${genre.name
                  .split(' ')
                  .join('')
                  .toLowerCase()}`}
                key={genre.id}
              >
                <Button text={genre.name} variant="gradient" />
              </Link>
            ))}
          </div>
        )}
      </section>
      {aditionalContent.length > 0 && (
        <section className="recommendations">
          <h2 className="recommendations__title">
            {aditionalContentTitle[mediaType]}
          </h2>
          <SlideGroup
            items={mapCardItems(aditionalContent)}
            className="similar-content"
          />
        </section>
      )}

      {mediaData.backdrop_path ? (
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${mediaData.backdrop_path})`
          }}
          className="backdrop-image"
        />
      ) : (
        <div className="backdrop-image backdrop-image--empty" />
      )}
    </section>
  );
}

export default Details;
