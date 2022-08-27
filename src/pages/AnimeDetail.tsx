/** @jsxImportSource @emotion/react */
import React from 'react';
// import { css } from '@emotion/react';
import { useQuery, gql } from '@apollo/client';

import { MediaQueryData } from 'types/models';

import DetailPageLayout from "layouts/DetailPageLayout";
import Spinner from 'components/Spinner';
import { useParams } from 'react-router-dom';

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

  const media = React.useMemo(() => data?.Media, [data]);

  console.log(data);

  return (
    <DetailPageLayout title={media?.title?.romaji || 'Anime Detail'} >
      { loading && <Spinner /> }
      { data && (
        <div>{media?.description}</div>
      ) }
    </DetailPageLayout>
  )
}
