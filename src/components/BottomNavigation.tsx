/** @jsxImportSource @emotion/react */
import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/react';

export type NavigationRoute = {
  title: string,
  icon: React.ReactNode,
  selectedIcon?: React.ReactNode,
  path: string,
}

type Props = {
  routes: NavigationRoute[]
}

const BottomNavigation = ({ routes }: Props) => {
  const { pathname } = useLocation();

  const isPathMatch = (pathname: string, path: string) => {
    return pathname.includes(path);
  }

  const getIcon = ({ path, icon, selectedIcon }: NavigationRoute) => {
    if (isPathMatch(pathname, path)) return selectedIcon || icon;
    return icon;
  }

  return (
    <nav css={css`
      position: fixed;
      bottom: 0;
      margin: auto;
      max-width: 480px;
      display: flex;
      align-items: center;
      width: 100%;
      height: var(--height-navigation);
      border-top: 1px solid #eaeaea;
      background: var(--color-subdued);
    `}>
      {routes.map((navigationRoute, index) => {
        const { path, title } =  navigationRoute;
        const isPathMatchValue = isPathMatch(pathname, path);
        const icon = getIcon(navigationRoute);
        return (
          <Link
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              flex: 1;
            `}
            to={path}
            key={index}
          >
            <div css={css`display: flex`}>{icon}</div>
            <span
              css={css`
                font-size: var(--font-size-small);
                color: var(--current-color);
              `}
              style={{
                '--current-color': `var(--color-${isPathMatchValue ? 'primary' : 'base'})`
              } as React.CSSProperties}
            >{ title }</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomNavigation;
