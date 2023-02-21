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

const genreNameToUrl = (name, normal = true) => {
  let splitName = [];
  let urlName = '';
  if (!normal) {
    if (name.includes('&')) {
      splitName = name.split('&');
      urlName = splitName.join(' & ');
    } else {
      splitName = name.split('-');
      urlName = splitName.join(' ');
    }
    return urlName.toLowerCase();
  }
  splitName = name.split(' ');
  if (splitName.includes('&')) urlName = splitName.join('');
  else urlName = splitName.join('-');
  return urlName.toLowerCase();
};

const splitDate = (date) => {
  const months = new Map();
  months.set(0, 'january');
  months.set(1, 'february');
  months.set(2, 'march');
  months.set(3, 'april');
  months.set(4, 'may');
  months.set(5, 'june');
  months.set(6, 'july');
  months.set(7, 'august');
  months.set(8, 'september');
  months.set(9, 'october');
  months.set(10, 'november');
  months.set(11, 'december');

  const base = new Date(date);
  const day = base.getUTCDate();
  const month = base.getMonth();
  const year = base.getFullYear();

  return { day, month: months.get(month), year };
};

export {
  mapCardData,
  removeDuplicateId,
  generateSkeletons,
  splitDate,
  genreNameToUrl
};
