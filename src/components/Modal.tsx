/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

type Props = React.PropsWithChildren<{
  title: string
}>

const Modal = ({ children, title }: Props) => {
  return (
    <div css={css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #000000ad;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 101;
    `}>
      <div css={css`
        background: white;
        width: 80%;
        max-width: 480px;
        border-radius: 30px;
        overflow: hidden;
      `}>
        <div css={css`
          text-align: center;
          font-weight: bold;
          border-bottom: 1px solid #cecece;
          color: var(--color-secondary);
          padding: 10px;
        `}>{title}</div>
        <div>
          { children }
        </div>
      </div>
    </div>
  )
};

export default Modal;
