/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import BottomNavigation from '../components/BottomNavigation';
import MovieIcon from '../components/MovieIcon';
import CollectionIcon from '../components/CollectionIcon';

type Props = {
  children: React.ReactNode,
  title?: string,
}

// temporary
const routes = [
  {
    title: 'Anime',
    path: '/animes',
    icon: <MovieIcon css={css`width: 24px`} fill="var(--color-secondary)" />,
  },
  {
    title: 'Collections',
    path: '/collections',
    icon: <CollectionIcon css={css`width: 24px`} fill="var(--color-primary)" />,
  },
]

const BasePageLayout = ({ children, title }: Props) => {
  return (
    <div css={css`
      max-width: 480px;
      margin: auto;
      padding-bottom: var(--height-bottom-navigation);
      min-height: calc(200vh - var(--height-bottom-navigation));
      background: white;
    `}>
      <div css={css`
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: sticky;
        top: 0;
        border-bottom: 1px solid #eaeaea;
        background: var(--color-subdued);
      `}>
        <h1>{ title }</h1>
      </div>

      {children}

      <BottomNavigation routes={routes} />
    </div>
  )
};

export default BasePageLayout;
