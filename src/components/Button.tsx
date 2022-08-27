/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from '@emotion/react';
import { JSX } from '@emotion/react/jsx-runtime';
import { ClassAttributes, ButtonHTMLAttributes } from 'react';

const Button = (props: JSX.IntrinsicAttributes & { css?: Interpolation<Theme>; } & ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement> & { css?: Interpolation<Theme>; }) => {
  const { children } = props;
  return (
    <button css={css`
      padding: 5px 10px;
      background: var(--color-primary);
      color: white;
      border-radius: 10px;
      border: none;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 16px;
      &:active {
        opacity: .5;
      }
    `} {...props}>
      { children }
    </button>
  )
};

export default Button;
