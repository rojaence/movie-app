import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getMediaDetails,
  getRecommendations,
  getPersonCredits,
  getMultimediaData
} from '@/api/index';
import {
  generateSkeletons,
  splitDate,
  removeDuplicateId,
  genreNameToUrl
} from '@/utils';
import { getGenres } from '@/api';
import { SnackbarContext } from '@/context/SnackbarContext';
import Button from '@/components/Button';
import Icon from '@/components/icons/Icon';
import Skeleton from '@/components/Skeleton';
import CardSkeleton from '@/components/CardSkeleton';
import SlideGroup from '@/containers/SlideGroup';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import useModal from '@/hooks/useModal';
import Chip from '@/components/Chip';
import Sheet from '@/components/Sheet';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import useToggleButtonGroup from '@/hooks/useToggleButtonGroup';
import { useTranslation } from 'react-i18next';
import '@/styles/details.scss';

function Details() {
  const [loading, setLoading] = useState(false);
  const { mediaType, mediaId } = useParams();
  const [mediaData, setMediaData] = useState(null);
  const [trailerData, setTrailerData] = useState({});
  const [aditionalContent, setAditionalContent] = useState([]);
  const [videoGallery, setVideoGallery] = useState([]);
  const [genres, setGenres] = useState([]);
  const [videoSource, setVideoSource] = useState({
    key: '',
    name: '',
    src: ''
  });
  const [imageGallery, setImageGallery] = useState({
    backdrops: [],
    posters: []
  });
  const detailsSection = useRef(null);
  const snackbar = useContext(SnackbarContext);
  const trailerViewer = useModal({ closeKey: false, persistent: true });
  const videoGalleryViewer = useModal({ closeKey: false, persistent: true });

  const { t } = useTranslation();

  const aditionalContentTitle = {
    movie: t('common.recommendations'),
    tv: t('common.recommendations'),
    person: t('common.knownBy')
  };

  const mediaTypeLink = {
    movie: 'movies',
    tv: 'tv'
  };

  const chipColor = {
    movie: 'primary',
    tv: 'warning',
    person: 'success'
  };

  const galleryOptions = [
    {
      text: t('common.backdrops'),
      value: 'backdrops'
    },
    {
      text: t('common.posters'),
      value: 'posters'
    },
    {
      text: t('common.videos'),
      value: 'videos'
    }
  ];

  const galleryToggle = useToggleButtonGroup({
    initialItems: galleryOptions,
    initialSelected: galleryOptions[0]
  });

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

  const imageSizeConfig = {
    backdrops: 'w1066_and_h600_bestv2',
    posters: 'w440_and_h660_face'
  };

  const playVideoSource = (data) => {
    setVideoSource({
      name: data.name,
      key: data.key,
      src: `https://www.youtube.com/embed/${data.key}`
    });
    videoGalleryViewer.show();
  };

  const mapGalleryItems = ({
    data = [],
    dataType = 'backdrop',
    width = 300,
    height = 'auto'
  } = {}) => {
    const mapItems = data.map((item, index) => ({
      id: item.id || `${dataType}-${index}`,
      element: (
        <a
          href={`https://image.tmdb.org/t/p/original/${item.file_path}`}
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          <Sheet variant="neutral" width={width} height={height} pointer>
            <img
              src={`https://image.tmdb.org/t/p/${imageSizeConfig[dataType]}${item.file_path}`}
              alt={t('common.galleryItem')}
              className="image-cover"
            />
          </Sheet>
        </a>
      )
    }));
    return mapItems;
  };

  const mapVideoItems = ({ data = [], width = 754, height = 'auto' }) => {
    const mapItems = data.map((item, index) => ({
      id: item.id || `video-${index}`,
      element: (
        <Sheet
          variant="neutral"
          width={width}
          height={height}
          pointer
          onClick={() => playVideoSource(item)}
        >
          <img
            src={`https://i.ytimg.com/vi/${item.key}/hqdefault.jpg`}
            alt={t('common.galleryItem')}
            className="image-cover"
          />
          <Icon
            name="playArrow"
            className="play-icon elevation-1"
            viewBox="-1 -1 50 50"
          />
        </Sheet>
      )
    }));
    return mapItems;
  };

  const formatDate = (date) => {
    const { day, month, year } = splitDate(date);
    return `${t(`month.${month}`)} ${day}, ${year}`;
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
        let genresData;
        if (mediaType !== 'person') genresData = await getGenres({ mediaType });
        setGenres(genresData);
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
          aditional = movieCredits.cast.concat(tvCredits.cast);
        } else {
          const recData = await getRecommendations({
            mediaType,
            mediaId
          });
          const images = await getMultimediaData({
            mediaType,
            mediaId,
            dataType: 'images'
          });
          const videos = await getMultimediaData({
            mediaType,
            mediaId,
            dataType: 'videos'
          });
          const trailer = videos.results.find(
            (video) => video.type === 'Trailer'
          );
          if (trailer) setTrailerData(trailer);
          else setTrailerData({});
          setVideoGallery(videos.results);
          setImageGallery({
            backdrops: images.backdrops,
            posters: images.posters.slice(0, 20)
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
        <section className="content">
          <section className="media-content">
            <h2 className="media-content__title">Recommendations</h2>
            <SlideGroup
              items={generateSkeletons(5, <CardSkeleton />)}
              className="media-content__gallery"
            />
          </section>
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
          alt={t('common.poster')}
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
              <Chip
                text={t(`common.${mediaType}`)}
                color={chipColor[mediaType]}
                className="text-uppercase"
              />
              <span className="date">
                {(mediaData.release_date &&
                  formatDate(mediaData.release_date)) ||
                  (mediaData.first_air_date &&
                    formatDate(mediaData.first_air_date))}
              </span>
              {mediaType !== 'person' && trailerData.key && (
                <Button
                  text={t('common.playTrailer')}
                  color="success"
                  variant="text"
                  className="details__trailer-button"
                  style={{ color: 'var(--text-color)' }}
                  startIcon={<Icon name="playArrow" />}
                  onClick={trailerViewer.show}
                />
              )}
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
                to={`/${mediaTypeLink[mediaType]}/${genreNameToUrl(
                  genres.find((g) => g.id === genre.id).name
                )}`}
                key={genre.id}
              >
                <Button
                  text={genres.find((g) => g.id === genre.id).translation}
                  variant="gradient"
                />
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="content">
        {aditionalContent.length > 0 && (
          <section className="media-content">
            <header className="media-content__header">
              <h2 className="media-content__title">
                {aditionalContentTitle[mediaType]}
              </h2>
            </header>
            <SlideGroup
              items={mapCardItems(aditionalContent)}
              className="media-content__gallery"
            />
          </section>
        )}

        {mediaType !== 'person' && (
          <section className="media-content">
            <header className="media-content__header">
              <h2 className="media-content__title">{t('common.gallery')}</h2>
              <ToggleButtonGroup
                items={galleryToggle.items}
                selected={galleryToggle.selected}
                toggle={galleryToggle.toggle}
                color="info"
              />
            </header>
            {galleryToggle.selected.value !== 'videos' ? (
              <SlideGroup
                items={mapGalleryItems({
                  data: imageGallery[galleryToggle.selected.value],
                  dataType: galleryToggle.selected.value,
                  width:
                    galleryToggle.selected.value === 'backdrops' ? 754 : 280,
                  height: 424
                })}
                className="media-content__gallery"
              />
            ) : (
              <SlideGroup
                items={mapVideoItems({ data: videoGallery, height: 424 })}
                className="media-content__gallery"
              />
            )}
          </section>
        )}
      </section>

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

      {trailerData.key && mediaType !== 'person' && (
        <Modal
          hide={trailerViewer.hide}
          show={trailerViewer.show}
          open={trailerViewer.open}
          persistent
        >
          <article className="video-viewer">
            <header className="video-viewer__header">
              <h2 className="video-viewer__title">{`${
                mediaData.name || mediaData.title
              } - Trailer`}</h2>
              <Button
                className="video-viwer__close-btn"
                startIcon={<Icon name="close" />}
                variant="plain"
                onClick={trailerViewer.hide}
              />
            </header>
            {trailerViewer.open && (
              <iframe
                className="video-viewer__player"
                src={`https://www.youtube.com/embed/${trailerData.key}`}
                title={`${mediaData.name || mediaData.title} - ${
                  trailerData.name
                }`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              />
            )}
          </article>
        </Modal>
      )}

      {videoGallery.length > 0 && mediaType !== 'person' && (
        <Modal
          hide={videoGalleryViewer.hide}
          show={videoGalleryViewer.show}
          open={videoGalleryViewer.open}
          persistent
        >
          <article className="video-viewer">
            <header className="video-viewer__header">
              <h2 className="video-viewer__title">{videoSource.name}</h2>
              <Button
                className="video-viwer__close-btn"
                startIcon={<Icon name="close" />}
                variant="plain"
                onClick={videoGalleryViewer.hide}
              />
            </header>
            {videoGalleryViewer.open && (
              <iframe
                className="video-viewer__player"
                src={videoSource.src}
                title={videoSource.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              />
            )}
          </article>
        </Modal>
      )}
    </section>
  );
}

export default Details;
