/** @jsxImportSource @emotion/react */
import React from 'react';
// import { css } from '@emotion/react';

import BasePageLayout from "layouts/BasePageLayout";
import { useCollectionStore } from 'stores/collections';
import CollectionCard from 'components/CollectionCard';

const CollectionList = () => {
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

  return (
    <BasePageLayout title="Collections">
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
    </BasePageLayout>
  )
};

export default CollectionList;
