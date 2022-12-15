const mapCardData = (data) => {
  const mapItems = data.map((item) => ({
    id: item.id,
    title: item.title || item.name,
    image: item.poster_path
      ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
      : '',
    mediaType: item.media_type
  }));
  return mapItems;
};

export default mapCardData;
