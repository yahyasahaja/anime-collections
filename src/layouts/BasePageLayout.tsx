/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import BottomNavigation from 'components/BottomNavigation';
import MovieIcon from 'icons/MovieIcon';
import CollectionIcon from 'icons/CollectionIcon';

type Props = React.PropsWithChildren<{
  title?: string,
  postfix?: React.ReactNode,
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

const BasePageLayout = ({ children, title, postfix }: Props) => {
  const fillerElement = <div css={css`flex: 1`} />;
  const prefix = fillerElement;
  const finalPostfix = postfix || fillerElement;

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
        justify-content: evenly;
        position: sticky;
        top: 0;
        border-bottom: 1px solid #eaeaea;
        background: var(--color-subdued);
      `}>
        {prefix}
        <h1 css={css`display: flex; align-items: center`}>{ title }</h1>
        {finalPostfix}
      </section>

      {children}

      <BottomNavigation routes={routes} />
    </div>
  )
};

export default BasePageLayout;
