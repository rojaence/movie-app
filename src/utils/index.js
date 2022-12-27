const mapCardData = (data) => {
  const mapItems = data.map((item) => {
    let imagePath = '';
    if (item.poster_path || item.profile_path)
      imagePath = `https://image.tmdb.org/t/p/w300${
        item.poster_path || item.profile_path
      }`;
    return {
      id: item.id,
      title: item.title || item.name,
      image: imagePath,
      mediaType: item.media_type
    };
  });
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

const generateSkeletons = (quantity, component) => {
  const items = [];
  for (let i = 1; i <= quantity; i += 1) {
    items.push({
      id: `skeleton-${i}`,
      element: component
    });
  }
  return items;
};

export { mapCardData, removeDuplicateId, generateSkeletons };
