/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from '@emotion/react';

import { useCollectionStore } from "stores/collections";

import Modal from "./Modal";
import TextField from "./TextField";

type Props = {
  collectionName: string,
  onDone: () => void
}

const EditCollectionModal = ({ collectionName, onDone }: Props) => {
  const [ newCollectionName, setNewCollectionName ] = React.useState(collectionName);

  const { updateCollectionName } = useCollectionStore(state => ({
    updateCollectionName: state.updateCollectionName,
  }));

  const handleAddCollection = React.useCallback(async () => {
    await updateCollectionName(collectionName, newCollectionName);
    onDone();
  }, [updateCollectionName, collectionName, newCollectionName, onDone])

  return (
    <Modal title={`Edit ${collectionName}`}>
      <div css={css`padding: 10px; padding-right: 0; width: 100%`}>
        <TextField
          id="anime-collection"
          name="anime-collection"
          label="Collection Name"
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
        `}>Save</button>
      </div>
    </Modal>
  )
}

export default EditCollectionModal;
