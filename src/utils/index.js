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

const removeDuplicateId = (data) => {
  const set = new Set();
  return data.filter((item) => {
    const isDuplicate = set.has(item.id);
    set.add(item.id);
    return !isDuplicate;
  });
};

export { mapCardData, removeDuplicateId };
