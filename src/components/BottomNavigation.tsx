/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom'
import { css } from '@emotion/react';

export type NavigationRoute = {
  title: string,
  icon: React.ReactNode,
  path: string,
}

type Props = {
  routes: NavigationRoute[]
}

export default ({ routes }: Props) => {
  return (
    <nav css={css`
      position: fixed;
      bottom: 0;
      margin: auto;
      max-width: 480px;
      display: flex;
      align-items: center;
      width: 100%;
      height: 56px;
      border-top: 1px solid #eaeaea;
    `}>
      {routes.map(({ path, title, icon }) => (
        <Link
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
          `}
          to={path}
        >
          <div>{icon}</div>
          <span css={css`font-size: 12px`}>{ title }</span>
        </Link>
      ))}
    </nav>
  )
}
