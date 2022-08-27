/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from '@emotion/react';

import Modal from "./Modal";
import TextField from "./TextField";
import { Media } from "types/models";

type Props = {
  onDone: () => void,
  medias?: (Media | undefined)[]
}

const AddAnimeToCollectionModal = ({ onDone }: Props) => {
  const [ newCollectionName, setNewCollectionName ] = React.useState('');

  return (
    <Modal title="Add Anime to Collection">
      <div>
        list
        <div css={css`display: flex; align-items: flex-end`}>
          <div css={css`padding: 10px; padding-right: 0; flex: 1`}>
            <TextField
              id="anime-collection"
              name="anime-collection"
              label="New Collection"
              placeholder="My favorite collection"
              value={newCollectionName}
              onChange={e => setNewCollectionName(e.target.value)}
            />
          </div>
          <button css={css`
            color: var(--color-primary);
            font-weight: bold;
            border: none;
            background: white;
            height: 30px;
            width: 50px;
            margin-bottom: 22px;
            &:active {
              opacity: 0.5;
            }
          `}>Save</button>
        </div>
      </div>
      <div css={css`
        width: 100%;
        display: flex;
        height: 40px;
        border-top: 1px solid #cecece;
      `}>
        <button onClick={onDone} css={css`
          color: var(--color-primary);
          font-weight: bold;
          width: 100%;
          border: none;
          background: var(--color-subdued);
          &:active {
            opacity: 0.5;
          }
        `}>Done</button>
      </div>
    </Modal>
  )
}

export default AddAnimeToCollectionModal;
