/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import BottomNavigation from '../components/BottomNavigation';
import MovieIcon from '../components/MovieIcon';

type Props = {
  children: React.ReactNode,
  title?: string,
}

// temporary
const routes = [
  {
    title: 'Anime',
    path: '/animes',
    icon: <MovieIcon css={css`width: 30px`} />,
  },
  {
    title: 'Collections',
    path: '/collections',
    icon: <MovieIcon css={css`width: 30px`} stroke="blue" />,
  },
]

export default ({ children, title }: Props) => {
  return (
    <div css={css`
      max-width: 480px;
      margin: auto;
      padding-bottom: 56px;
    `}>
      <div css={css`
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        border-bottom: 1px solid #eaeaea;
      `}>
        <h1>{ title }</h1>
      </div>

      {children}

      <BottomNavigation routes={routes} />
    </div>
  )
}
