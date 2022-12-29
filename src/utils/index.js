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

const splitDate = (date) => {
  const months = new Map();
  months.set(0, 'January');
  months.set(1, 'February');
  months.set(2, 'March');
  months.set(3, 'April');
  months.set(4, 'May');
  months.set(5, 'June');
  months.set(6, 'July');
  months.set(7, 'August');
  months.set(8, 'September');
  months.set(9, 'October');
  months.set(10, 'November');
  months.set(11, 'December');

  const base = new Date(date);
  const day = base.getUTCDate();
  const month = base.getMonth();
  const year = base.getFullYear();

  return { day, month: months.get(month), year };
};

export { mapCardData, removeDuplicateId, generateSkeletons, splitDate };
