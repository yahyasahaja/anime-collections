/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { css } from '@emotion/react';

import DetailPageLayout from "layouts/DetailPageLayout";
import { useCollectionStore } from 'stores/collections';
import MediaCard from 'components/MediaCard';

const CollectionDetail = () => {
  const { collectionName } = useParams();
  const { collections, refreshCollections } = useCollectionStore(state => ({
    collections: state.collections,
    refreshCollections: state.refreshCollections,
  }));

  const medias = React.useMemo(
    () => Object.values(collections[collectionName || ''] || {}),
    [collections, collectionName]
  );

  React.useEffect(() => {
    (async () => await refreshCollections())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DetailPageLayout title={`Collection ${collectionName}`}>
      <section css={css`
        display: grid;
        grid-template-columns: auto;
        gap: 20px;
        padding: 20px;
      `}>
        {medias.map((media, i) => {
          return (
            <MediaCard
              key={i}
              media={media}
              hasDeleteButton={true}
              collectionName={collectionName}
            />
          )
        })}
        { medias.length === 0 && (
          <div css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50vh;
          `}>
            <div css={css`
              text-align: center;
              font-size: 16px;
              color: var(--color-secondary);
            `}>
              This collection is empty. <br /> <br />  Please add your anime collection at
              {' '}<Link css={css`
                color: var(--color-primary);
                &:active {
                  opacity: 0.5;
                }
              `} to="/animes">Anime page</Link>.
            </div>
          </div>
        )}
      </section>
    </DetailPageLayout>
  )
};

export default CollectionDetail;
