/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from '@emotion/react';

import { useCollectionStore } from "stores/collections";

import Modal from "./Modal";
import TextField from "./TextField";

type Props = {
  onDone: () => void
}

const AddCollectionModal = ({ onDone }: Props) => {
  const [ newCollectionName, setNewCollectionName ] = React.useState('');

  const { createMediaCollection } = useCollectionStore(state => ({
    createMediaCollection: state.createMediaCollection,
  }));

  const handleAddCollection = React.useCallback(async () => {
    await createMediaCollection(newCollectionName);
    onDone();
  }, [createMediaCollection, newCollectionName, onDone])

  return (
    <Modal title="Add Collection">
      <div css={css`padding: 10px; width: 100%`}>
        <TextField
          id="anime-collection"
          name="anime-collection"
          label="New Collection"
          placeholder="My favorite collection"
          value={newCollectionName}
          onChange={e => setNewCollectionName(e.target.value)}
        />
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
          border-right: 1px solid #d6d6d6;
          &:active {
            opacity: 0.5;
          }
        `}>Cancel</button>
        <button onClick={handleAddCollection} css={css`
          color: var(--color-danger);
          font-weight: bold;
          width: 100%;
          border: none;
          background: var(--color-subdued);
          &:active {
            opacity: 0.5;
          }
        `}>Add</button>
      </div>
    </Modal>
  )
}

export default AddCollectionModal;
