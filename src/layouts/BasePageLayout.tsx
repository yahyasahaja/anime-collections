/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import BottomNavigation from 'components/BottomNavigation';
import MovieIcon from 'icons/MovieIcon';
import CollectionIcon from 'icons/CollectionIcon';

type Props = React.PropsWithChildren<{
  title?: string,
}>

// temporary
const routes = [
  {
    title: 'Anime',
    path: '/animes',
    icon: <MovieIcon css={css`width: 24px`} fill="var(--color-secondary)" />,
    selectedIcon: <MovieIcon css={css`width: 24px`} fill="var(--color-primary)" />,
  },
  {
    title: 'Collections',
    path: '/collections',
    icon: <CollectionIcon css={css`width: 24px`} fill="var(--color-secondary)" />,
    selectedIcon: <CollectionIcon css={css`width: 24px`} fill="var(--color-primary)" />,
  },
]

const BasePageLayout = ({ children, title }: Props) => {
  return (
    <div css={css`
      max-width: 480px;
      margin: auto;
      padding-bottom: var(--height-navigation);
      min-height: 100vh;
      background: white;
    `}>
      <section css={css`
        height: var(--height-navigation);
        display: flex;
        justify-content: center;
        align-items: center;
        position: sticky;
        top: 0;
        border-bottom: 1px solid #eaeaea;
        background: var(--color-subdued);
      `}>
        <h1>{ title }</h1>
      </section>

      {children}

      <BottomNavigation routes={routes} />
    </div>
  )
};

export default BasePageLayout;
