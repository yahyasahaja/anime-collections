/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import { MediaCollection } from 'types/models';
import DeleteCollectionModal from './DeleteCollectionModal';
import EditCollectionModal from './EditCollectionModal';

type Props = {
  collectionName: string,
  mediaCollection: MediaCollection,
}

const CollectionCard = ({ collectionName, mediaCollection, ...attributes }: Props) => {
  const [ isDeleteModalActive, setIsDeleteModalActive ] = React.useState(false);
  const [ isEditModalActive, setIsEditModalActive ] = React.useState(false);

  const media = React.useMemo(() => {
    let idMal = '';
    for (idMal in mediaCollection) {
      if (mediaCollection.hasOwnProperty(idMal)) continue;
      else break;
    }

    return mediaCollection[idMal] || null;
  }, [mediaCollection]);

  const mediaImage = React.useMemo(() =>
    media?.bannerImage || media?.coverImage?.extraLarge || '/images/image-placeholder.jpeg'
  , [media]);

  const handleDeleteCollectionModalClick = React.useCallback(() => {
    setIsDeleteModalActive(false);
  }, [setIsDeleteModalActive]);

  const handleEditCollectionModalClick = React.useCallback(() => {
    setIsEditModalActive(false);
  }, [setIsEditModalActive]);

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
        <Link to={`/collections/${collectionName}`} css={css`
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
        <div css={css`
          width: 100%;
          display: flex;
          border-top: 1px solid #d6d6d6;
          background: var(--color-subdued);
        `}>
          <button onClick={() => setIsDeleteModalActive(true)} css={css`
            flex: 1;
            display: block;
            border: none;
            font-weight: bold;
            color: var(--color-danger);
            padding: 10px;
            background: none;
            border-right: 1px solid #d6d6d6;
            &:active {
              opacity: 0.5;
            }
          `}>
            Delete
          </button>
          <button onClick={() => setIsEditModalActive(true)} css={css`
            flex: 1;
            display: block;
            border: none;
            font-weight: bold;
            color: var(--color-primary);
            padding: 10px;
            background: none;
            &:active {
              opacity: 0.5;
            }
          `}>
            Edit
          </button>
        </div>
      </div>
      { isDeleteModalActive && <DeleteCollectionModal
        collectionName={collectionName}
        onDone={handleDeleteCollectionModalClick}
      />}
      { isEditModalActive && <EditCollectionModal
        collectionName={collectionName}
        onDone={handleEditCollectionModalClick}
      />}
    </div>
  )
};

export default CollectionCard;
