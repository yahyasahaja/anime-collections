/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from '@emotion/react';

import { useCollectionStore } from "stores/collections";

import Modal from "./Modal";
import { Media } from "types/models";

type Props = {
  collectionName: string
  media: Media
  onDone: (deleted: boolean) => void
}

const DeleteMediaFromCollectionModal = ({ collectionName, media, onDone }: Props) => {
  const { removeMediaFromCollection } = useCollectionStore(state => ({
    removeMediaFromCollection: state.removeMediaFromCollection,
  }));

  const handleCancelDeleteCollection = React.useCallback(async () => {
    onDone(false);
  }, [onDone])

  const handleDeleteCollection = React.useCallback(async () => {
    await removeMediaFromCollection([media], collectionName);
    onDone(true);
  }, [removeMediaFromCollection, collectionName, onDone, media])

  return (
    <Modal title="Remove Anime from Collection">
      <div css={css`
        height: 80px;
        font-size: 16px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      `}>
        <span>Are you sure you want to remove <b>{media.title.romaji}</b> from <b>{collectionName}</b> ?</span>
      </div>
      <div css={css`
        width: 100%;
        display: flex;
        height: 40px;
        border-top: 1px solid #cecece;
      `}>
        <button onClick={handleCancelDeleteCollection} css={css`
          color: var(--color-primary);
          font-weight: bold;
          width: 100%;
          border: none;
          background: var(--color-subdued);
          border-right: 1px solid #d6d6d6;
          &:active {
            opacity: 0.5;
          }
        `}>Cancel</button>
        <button onClick={handleDeleteCollection} css={css`
          color: var(--color-danger);
          font-weight: bold;
          width: 100%;
          border: none;
          background: var(--color-subdued);
          &:active {
            opacity: 0.5;
          }
        `}>Delete</button>
      </div>
    </Modal>
  )
}

export default DeleteMediaFromCollectionModal;
