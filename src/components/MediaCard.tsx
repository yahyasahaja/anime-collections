/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Media } from 'types/models';
import DeleteMediaFromCollectionModal from './DeleteMediaFromCollectionModal';

type Props = {
  media: Media
  hasDeleteButton?: boolean
  collectionName?: string
}

const MediaCard = ({ media, hasDeleteButton = false, collectionName = '', ...attributes }: Props) => {
  const [ isDeleteModalActive, setIsDeleteModalActive ] = React.useState(false);

  const handleDeleteCollectionModalClick = React.useCallback(() => {
    setIsDeleteModalActive(false);
  }, [setIsDeleteModalActive]);

  return (
    <div {...attributes} css={css`
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
                height: 250px;
                object-fit: cover;
                object-position: center;
              `}
              src={media.coverImage.extraLarge}
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
          `}>{media.title.romaji}</h2>
        </Link>
        { hasDeleteButton && (
          <React.Fragment>
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
            </div>
            { isDeleteModalActive && collectionName && (
              <DeleteMediaFromCollectionModal
                collectionName={collectionName}
                media={media}
                onDone={handleDeleteCollectionModalClick}
              />
            ) }
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default MediaCard;
