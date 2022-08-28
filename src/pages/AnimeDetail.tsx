/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useQuery, gql } from '@apollo/client';
import { sanitize } from 'dompurify';
import { MediaQueryData } from 'types/models';

import DetailPageLayout from "layouts/DetailPageLayout";
import Spinner from 'components/Spinner';
import { useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Button from 'components/Button';
import CollectionIcon from 'icons/CollectionIcon';
import AddAnimeToCollectionModal from 'components/AddAnimeToCollectionModal';

export const PAGE_MEDIA_QUERY = gql`
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
    }
  }
}
`;

export default function AnimeDetail() {
  const { id } = useParams();
  const { data, loading } = useQuery<MediaQueryData>(PAGE_MEDIA_QUERY, { variables: { idMal: id } });

  const [ isAddCollectionModalOpened, setIsAddCollectionModalOpened ] = React.useState(false);

  const media = React.useMemo(() => data?.Media, [data]);
  const medias = React.useMemo(() => [media], [media]);

  return (
    <DetailPageLayout title={media?.title?.romaji || 'Anime Detail'} >
      { loading && <Spinner /> }
      { media && (
        <div>
          <LazyLoadImage
            css={css`
              width: 100%;
              height: 250px;
              object-fit: cover;
              object-position: center;
            `}
            src={media.bannerImage}
            placeholderSrc="/images/image-placeholder.jpeg"
            alt="anime cover"
          />
          <div css={css`
            margin-top: -125px;
            margin-left: 10px;
            position: absolute;
          `}>
            <LazyLoadImage
              css={css`
                width: 100px;
                height: 200px;
                object-fit: cover;
                object-position: center;
                border: 5px solid white;
                overflow: hidden;
                border-radius: 30px;
              `}
              src={media.coverImage.extraLarge}
              placeholderSrc="/images/image-placeholder.jpeg"
              alt="anime cover"
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
