/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import BasePageLayout from "../layouts/BasePageLayout";
import MediaCard from 'components/MediaCard';

export default function AnimeList() {
  return (
    <BasePageLayout title="Anime List" >
      <section css={css`
        display: grid;
        grid-template-columns: auto auto;
        padding: 10px;
      `}>
        <MediaCard media={{
          coverImage: {
            extraLarge: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx463-QDnETPoHp9oD.jpg'
          },
          title: {
            romaji: "One piece"
          }
        }}/>
        <MediaCard media={{
          coverImage: {
            extraLarge: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx463-QDnETPoHp9oD.jpg'
          },
          title: {
            romaji: "One piece"
          }
        }}/>
        <MediaCard media={{
          coverImage: {
            extraLarge: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx463-QDnETPoHp9oD.jpg'
          },
          title: {
            romaji: "One piece"
          }
        }}/>
        <MediaCard media={{
          coverImage: {
            extraLarge: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx463-QDnETPoHp9oD.jpg'
          },
          title: {
            romaji: "One piece"
          }
        }}/>
        <MediaCard media={{
          coverImage: {
            extraLarge: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx463-QDnETPoHp9oD.jpg'
          },
          title: {
            romaji: "One piece"
          }
        }}/>
      </section>
    </BasePageLayout>
  )
}
