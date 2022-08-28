/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import { MediaCollection } from 'types/models';

type Props = {
  collectionName: string,
  mediaCollection: MediaCollection,
}

const CollectionCard = ({ collectionName, mediaCollection, ...attributes }: Props) => {
  const media = React.useMemo(() => {
    let idMal = '';
    for (idMal in mediaCollection) {
      if (mediaCollection.hasOwnProperty(idMal)) continue;
      else break;
    }

    return mediaCollection[idMal] || null;
  }, [mediaCollection]);

  const mediaImage = React.useMemo(() =>
    media?.bannerImage || media?.coverImage?.extraLarge || '/images/image-placholder.jpeg'
  , [media]);

  return (
    <div {...attributes}  css={css`
      padding: 10px 20px;
      display: block;
    `}>
      <div css={css`
        border-radius: 30px;
        overflow: hidden;
        box-shadow: 0px 1px 30px gainsboro;
      `}>
        <Link to={`/animes/${media.idMal}`} css={css`
          &:active {
            opacity: 0.5;
          }
        `}>
          <div>
            <LazyLoadImage
              css={css`
                width: 100%;
                height: 100px;
                object-fit: cover;
                object-position: center;
              `}
              src={mediaImage}
              placeholderSrc="/images/image-placeholder.jpeg"
              alt="anime cover"
            />
          </div>
          <h2 css={css`
            height: 50px;
            font-size: 18px;
            padding: 10px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
            max-width: 80%;
            margin: auto;
            background: white;
            width: 100%;
          `}>{collectionName}</h2>
        </Link>
        <button css={css`
          width: 100%;
          display: block;
          border: none;
          border-top: 1px solid #ffadd3;
          font-weight: bold;
          color: var(--color-danger);
          padding: 10px;
          background: #ffeff6;
          &:active {
            opacity: 0.5;
          }
        `}>
          Delete
        </button>
      </div>
    </div>
  )
};

export default CollectionCard;
