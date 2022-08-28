/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from '@emotion/react';
import CheckedIcon from "icons/CheckedIcon";

type Props = React.PropsWithChildren<{
  checked?: boolean,
  id: string,
  onClick: (id: string | number, checked: boolean) => void,
}>

const ListItem = ({ id, checked = false, children, onClick }: Props) => {
  const selectedColor = checked ? 'var(--color-selected-background)' : 'white';
  const handleClick = React.useCallback(() => {
    onClick(id, checked);
  }, [id, onClick, checked])

  return (
    <div onClick={handleClick} style={{ background: selectedColor }} css={css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      height: 45px;
      border-bottom: 1px solid #e9e9e9;
    `}>
      <div css={css`flex: 1`}>{children}</div>
      { checked && (
        <div css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}><CheckedIcon css={css`width: 24px;`} fill="var(--color-primary)" /></div>
      ) }
    </div>
  )
};

export default ListItem;
