/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from '@emotion/react';

import { Media } from "types/models";
import { useCollectionStore } from "stores/collections";

import Modal from "./Modal";
import TextField from "./TextField";
import ListItem from "./ListItem";

type Props = {
  onDone: () => void,
  medias?: (Media | undefined)[]
}

const AddAnimeToCollectionModal = ({ onDone, medias }: Props) => {
  const { getCollectionNames, putMediaToCollections, refreshCollections, collections, removeMediaFromCollection } = useCollectionStore(state => ({
    getCollectionNames: state.getCollectionNames,
    putMediaToCollections: state.putMediaToCollections,
    refreshCollections: state.refreshCollections,
    collections: state.collections,
    removeMediaFromCollection: state.removeMediaFromCollection,
  }));
  const [ newCollectionName, setNewCollectionName ] = React.useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const collectionNames = React.useMemo(() => getCollectionNames() || [], [getCollectionNames, collections]);

  const handleSaveNewCollection = React.useCallback(async () => {
    if (newCollectionName) {
      await putMediaToCollections(newCollectionName, medias as Media[]);
      setNewCollectionName('')
    }
  }, [ putMediaToCollections, newCollectionName, setNewCollectionName, medias ]);

  const handleListClick = React.useCallback(async (collectionName: string | number, checked: boolean) => {
    if (!checked) await putMediaToCollections(collectionName as string, medias as Media[]);
    else await removeMediaFromCollection(medias as Media[], collectionName as string);
  }, [ putMediaToCollections, medias, removeMediaFromCollection ]);

  React.useEffect(() => {
    (async () => await refreshCollections())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal title="Add Anime to Collection">
      <div>
        <div css={css`max-height: 40vh; overflow-y: auto;`}>
          {collectionNames.map((name, i) => {
            const checked = medias?.some((media) => {
              const result = !!collections?.[name]?.[media?.idMal || ''];
              return result;
            })

            return <ListItem checked={checked} id={name} onClick={handleListClick} key={i}>{name}</ListItem>
          })}
        </div>
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
          <button onClick={handleSaveNewCollection} css={css`
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
