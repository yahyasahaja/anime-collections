/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useQuery, gql } from '@apollo/client';

import { Media, PageQueryData } from 'types/models';

import BasePageLayout from "layouts/BasePageLayout";
import MediaCard from 'components/MediaCard';
import { PAGE_LIMIT } from 'configs/constants';

export const PAGE_MEDIA_QUERY = gql`
query ($page: Int, $perPage: Int) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media {
      id
      title {
        romaji
      }
      coverImage {
        extraLarge
      }
    }
  }
}
`;

export default function AnimeList() {
  const [ page ] = React.useState(1);
  const { data, loading, error } = useQuery<PageQueryData>(PAGE_MEDIA_QUERY, { variables: { page, perPage: PAGE_LIMIT } });

  console.log(data, loading, error)
  console.log(data?.Page)
  return (
    <BasePageLayout title="Anime List" >
      <section css={css`
        padding: 10px;
      `}>
        {data?.Page?.media?.map((media: Media) => {
          console.log('woi')
          return <MediaCard media={media}/>
        })}
      </section>
      { loading && <div>Loading</div>}
    </BasePageLayout>
  )
}
