/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useQuery, gql } from '@apollo/client';
import { sanitize } from 'dompurify';
import { MediaQueryData } from 'types/models';

import DetailPageLayout from "layouts/DetailPageLayout";
import Spinner from 'components/Spinner';
import { useParams } from 'react-router-dom';
import Button from 'components/Button';
import CollectionIcon from 'icons/CollectionIcon';
import AddAnimeToCollectionModal from 'components/AddAnimeToCollectionModal';
import { useCollectionStore } from 'stores/collections';
import CollectionCard from 'components/CollectionCard';
import LazyLoadMediaImage from 'components/LazyLoadMediaImage';

export const MEDIA_QUERY = gql`
query ($idMal: Int) {
  Media (idMal: $idMal) {
    id
    idMal
    title {
      romaji
    }
    description
    episodes
    bannerImage
    genres
    coverImage {
      extraLarge
      large
      medium
    }
  }
}
`;

export default function AnimeDetail() {
  const { id } = useParams();
  const { data, loading } = useQuery<MediaQueryData>(MEDIA_QUERY, { variables: { idMal: id } });

  const { collections, refreshCollections, getCollectionNamesByIdMal } = useCollectionStore(state => ({
    collections: state.collections,
    getCollectionNamesByIdMal: state.getCollectionNamesByIdMal,
    refreshCollections: state.refreshCollections,
  }));

  // state
  const [ isAddCollectionModalOpened, setIsAddCollectionModalOpened ] = React.useState(false);

  const media = React.useMemo(() => data?.Media, [data]);
  const medias = React.useMemo(() => [media], [media]);

  const collectionNames = React.useMemo(() => {
    const idMal = media?.idMal;
    if (idMal) return getCollectionNamesByIdMal(idMal.toString());
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collections, media, getCollectionNamesByIdMal]);

  // did mount
  React.useEffect(() => {
    (async () => await refreshCollections())();
  }, [refreshCollections]);

  return (
    <DetailPageLayout title={media?.title?.romaji || 'Anime Detail'} >
      { loading && <Spinner /> }
      { media && (
        <div>
          <LazyLoadMediaImage
            css={css`
              width: 100%;
              height: 250px;
              object-fit: cover;
              object-position: center;
              display: block;
            `}
            media={media}
            useBanner={true}
          />
          <div css={css`
            margin-top: -125px;
            margin-left: 10px;
            position: absolute;
          `}>
            <LazyLoadMediaImage
              css={css`
                width: 100px;
                height: 200px;
                object-fit: cover;
                object-position: center;
                border: 5px solid white;
                overflow: hidden;
                border-radius: 30px;
              `}
              media={media}
              useCover={true}
            />
          </div>
          <div css={css`height: 100px`}>
            <div css={css`
              padding-left: 130px;
              padding-top: 10px;
              display: flex;
              flex-wrap: wrap;
              overflow: hidden;
            `}>{media.genres.map((genre, i) => (
              <div key={i} css={css`
                background: white;
                padding: 5px 10px;
                color: #0f73c3;
                border: 1px solid #0f73c3;
                border-radius: 100px;
                margin-right: 5px;
                margin-bottom: 5px;
              `}>{genre}</div>
            ))}</div>
          </div>

          { media.episodes && <div css={css`padding: 10px; font-weight: bold`}>
            Have {media.episodes} episodes
          </div>}
          <div css={css`padding: 10px`}>
            <div css={css`padding-bottom: 30px`} dangerouslySetInnerHTML={{ __html: sanitize(media.description) }} />

            <Button onClick={() => setIsAddCollectionModalOpened(true)}>
              <CollectionIcon css={css`width: 24px; margin-right: 10px`} fill="white" /> Add to collection
            </Button>

            { collectionNames.length > 0
              && (
                <React.Fragment>
                  <h3 css={css`
                    font-weight: bold;
                    font-size: 24px;
                    margin: 20px 20px;
                    margin-top: 50px;
                  `}>Collections</h3>

                  <section>
                    {collectionNames.map((name, i) => {
                      return (
                        <CollectionCard
                          key={i}
                          collectionName={name}
                          mediaCollection={collections[name]}
                        />
                      )
                    })}
                  </section>
                </React.Fragment>
              )
            }
          </div>
        </div>
      ) }

      {isAddCollectionModalOpened && media && <AddAnimeToCollectionModal
        medias={medias}
        onDone={() => setIsAddCollectionModalOpened(false)}
      />}
    </DetailPageLayout>
  )
}
