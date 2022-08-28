/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ChevronIcon from 'icons/ChevronIcon';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = React.PropsWithChildren<{
  title?: string,
}>

const BasePageLayout = ({ children, title }: Props) => {
  const navigate = useNavigate();

  const handleBackButton = React.useCallback(() => navigate(-1), [navigate]);

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
        z-index: 100;
      `}>
        <button onClick={handleBackButton} css={css`
          background: none;
          border: none;
          display: flex;
          align-items: center;
          position: absolute;
          left: 0;
          top: 0;
          height: var(--height-navigation);
          &:active {
            opacity: 0.5;
          }
        `}>
          <ChevronIcon css={css`width: 24px`} fill="var(--color-primary)" />
          <span css={css`margin-left: 5px; color: var(--color-primary); font-size: 16px;`}>Back</span>
        </button>
        <h1 css={css`
          max-width: 150px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `}>{ title }</h1>
      </section>

      {children}
    </div>
  )
};

export default BasePageLayout;
