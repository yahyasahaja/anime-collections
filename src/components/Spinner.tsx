/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Spinner = () => (
  <div css={css`
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
  `}>
    <img css={css`height: 30px`} src="/images/loading.gif" alt="loading" />
  </div>
)

export default Spinner;
