/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from '@emotion/react';

import { useCollectionStore } from "stores/collections";

import Modal from "./Modal";

type Props = {
  collectionName: string,
  onDone: (deleted: boolean) => void
}

const DeleteCollectionModal = ({ collectionName, onDone }: Props) => {
  const { removeCollectionByName } = useCollectionStore(state => ({
    removeCollectionByName: state.removeCollectionByName,
  }));

  const handleCancelDeleteCollection = React.useCallback(async () => {
    onDone(false);
  }, [onDone])

  const handleDeleteCollection = React.useCallback(async () => {
    await removeCollectionByName(collectionName);
    onDone(true);
  }, [removeCollectionByName, collectionName, onDone])

  return (
    <Modal title="Delete Collection">
      <div css={css`
        height: 80px;
        font-size: 16px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
      `}>
        <span>Are you sure you want to delete <b>{collectionName}</b> ?</span>
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

export default DeleteCollectionModal;
