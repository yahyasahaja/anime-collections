/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useQuery, gql } from '@apollo/client';

import { Media, PageQueryData } from 'types/models';

import BasePageLayout from "layouts/BasePageLayout";
import MediaCard from 'components/MediaCard';
import { PAGE_LIMIT } from 'configs/constants';
import Spinner from 'components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

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
      idMal
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
  const [ page, setPage ] = React.useState(1);
  const [ animes, setAnimes ] = React.useState<Media[]>([]);
  const { data, loading, fetchMore } = useQuery<PageQueryData>(PAGE_MEDIA_QUERY, { variables: { page, perPage: PAGE_LIMIT } });

  const items = React.useMemo(() => data?.Page?.media || [], [data]);
  const pagination = data?.Page.pageInfo;
  const hasMore = pagination?.hasNextPage || false;

  React.useEffect(() => {
    const addedAnimes = [...animes, ...items];
    setAnimes(addedAnimes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, setAnimes]);

  const fetchNext = React.useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMore({ variables: { page: nextPage, perPage: PAGE_LIMIT } })
  }, [ fetchMore, page, setPage ]);

  return (
    <BasePageLayout title="Anime List" >
      <InfiniteScroll
        dataLength={animes.length}
        next={fetchNext}
        hasMore={hasMore}
        loader={<Spinner />}
      >
        { animes.map((media: Media, i) => <MediaCard key={i} media={media}/>) }
      </InfiniteScroll>
      { loading && <Spinner /> }
    </BasePageLayout>
  )
}
