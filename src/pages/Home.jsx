import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import '@/styles/home.scss';
import { getTrending } from '@/api/index';
import SlideGroup from '@/containers/SlideGroup';
import Card from '@/components/Card';

function Home() {
  const [trendingItems, setTrendingItems] = useState([]);
  useEffect(() => {
    const getTrendingItems = async () => {
      const data = await getTrending();
      return data;
    };

    getTrendingItems()
      .then((data) => {
        const cards = data.map((item) => (
          <Card
            data={{
              id: item.id,
              title: item.title,
              image: `https://image.tmdb.org/t/p/w300${item.poster_path}`
            }}
          />
        ));
        setTrendingItems(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <section className="shelf">
        <header className="shelf__header">
          <h2 className="shelf__title">Trending</h2>
          <Button
            text="See more"
            className="shelf__more-button"
            variant="rounded"
          />
        </header>
        <SlideGroup items={trendingItems} />
      </section>
      <section className="shelf">
        <header className="shelf__header">
          <h2 className="shelf__title">Most Popular</h2>
          <Button
            text="See more"
            className="shelf__more-button"
            variant="rounded"
          />
        </header>
        <SlideGroup items={[]} />
      </section>
    </>
  );
}

export default Home;
