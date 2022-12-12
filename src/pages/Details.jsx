import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaDetails } from '@/api/index';

function Details() {
  const [loading, setLoading] = useState(false);
  const { mediaType, movieId } = useParams();
  const [mediaData, setMediaData] = useState({});

  useEffect(() => {
    if (loading) return;
    const getDetails = async () => {
      try {
        setLoading(true);
        const data = await getMediaDetails({
          mediaType,
          mediaId: movieId
        });
        setMediaData(data);
      } catch (error) {
        console.log('🚀 ~ file: Details.jsx:20 ~ useEffect ~ error', error);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, []);

  return (
    <div>
      <h2>Esta es la página de detalles</h2>
      <div className="container">{JSON.stringify(mediaData)}</div>
    </div>
  );
}

export default Details;
