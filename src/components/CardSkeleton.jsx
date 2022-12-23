import React from 'react';
import Skeleton from '@/components/Skeleton';
import '@/styles/card.scss';

function CardSkeleton() {
  return (
    <div className="card card--skeleton">
      <Skeleton className="card__title" width="50%" />
      <div className="card__banner">
        <Skeleton className="card__image" height="100%" />
      </div>
    </div>
  );
}

export default CardSkeleton;
