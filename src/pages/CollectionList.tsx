/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

import BasePageLayout from "layouts/BasePageLayout";
import { useCollectionStore } from 'stores/collections';
import CollectionCard from 'components/CollectionCard';
import PlusIcon from 'icons/PlusIcon';
import AddCollectionModal from 'components/AddCollectionModal';

const CollectionList = () => {
  const [ isAddModalActive, setIsAddModalActive ] = React.useState(false);
  const { collections, getCollectionNames, refreshCollections } = useCollectionStore(state => ({
    collections: state.collections,
    getCollectionNames: state.getCollectionNames,
    refreshCollections: state.refreshCollections,
  }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const collectionNames = React.useMemo(() => getCollectionNames() || [], [getCollectionNames, collections]);

  React.useEffect(() => {
    (async () => await refreshCollections())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddCollectionModalClick = React.useCallback(() => {
    setIsAddModalActive(false);
  }, [setIsAddModalActive]);

  const postfix = (
    <div css={css`
      display: flex;
      center; flex: 1;
      justify-content: flex-end;
    `}>
      <button data-testid="add-collection-btn" onClick={() => setIsAddModalActive(true)} css={css`
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: none;
        &:active {
          opacity: 0.5;
        }
      `}>
        <PlusIcon css={css`width: 24px`} fill="var(--color-primary)" />
      </button>
    </div>
  )

  return (
    <BasePageLayout title="Collections" postfix={postfix}>
      <section>
        {collectionNames.map((name, i) => {
          return (
            <CollectionCard
              key={i}
              collectionName={name}
              mediaCollection={collections[name]}
            />
          )
        })}
      </section>
      { isAddModalActive && <AddCollectionModal onDone={handleAddCollectionModalClick} />}
    </BasePageLayout>
  )
};

export default CollectionList;
