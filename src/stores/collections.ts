import localforage from "localforage";
import create from 'zustand'
import { Media, MediaCollection, Collections } from 'types/models';

export const localForageCollectionsStore = localforage.createInstance({
  name: "collections"
});

declare global {
  interface Window {
    storage: typeof localForageCollectionsStore
  }
}
window.storage = localForageCollectionsStore;

export interface CollectionStore {
  collections: Collections
  getCollectionNames: () => string[]
  getMediaCollectionByCollectionName: (collectionName: string) => Promise<MediaCollection | null>
  checkMediaExistsInCollection: (collectionName: string, media: Media) => Promise<Media | undefined>
  createMediaCollection: (collectionName: string) => Promise<MediaCollection>
  putMediaToCollections: (collectionName: string, medias: Media[]) => Promise<MediaCollection>
  removeCollectionByName: (name: string) => Promise<string>
  updateCollectionName: (prev: string, next: string) => Promise<MediaCollection | null>
  setStorage: (key: string, value: MediaCollection) => Promise<void>
  refreshCollections: () => Promise<void>
  removeMediaFromCollection: (medias: Media[], collectionName: string) => Promise<void>
}

export const useCollectionStore = create<CollectionStore>()((set, get) => ({
  collections: {},
  getCollectionNames: () => Object.keys(get().collections),
  getMediaCollectionByCollectionName: async (collectionName: string) => {
    return await localForageCollectionsStore.getItem<MediaCollection>(collectionName);
  },
  checkMediaExistsInCollection: async (collectionName: string, media: Media) => {
    const mediaCollection = await get().getMediaCollectionByCollectionName(collectionName);
    return mediaCollection?.[media.idMal];
  },

  refreshCollections: async () => {
    const collections: Collections = {};
    await localForageCollectionsStore.iterate<MediaCollection, void>((value, key) => {
      collections[key] = value;
    });
    set(() => ({ collections }));
  },

  // utility
  setStorage: async (key: string, value: MediaCollection) => {
    await localForageCollectionsStore.setItem(key, value);
    get().refreshCollections();
  },

  // mutationos
  createMediaCollection: async (collectionName: string) => {
    const newMediaCollection: MediaCollection = {};
    await get().setStorage(collectionName, {});
    return newMediaCollection;
  },
  putMediaToCollections: async (collectionName: string, medias: Media[]) => {
    let mediaCollection = await get().getMediaCollectionByCollectionName(collectionName);
    if (!mediaCollection) mediaCollection = await get().createMediaCollection(collectionName);

    medias.forEach(media => mediaCollection && (mediaCollection[media.idMal] = media))
    await get().setStorage(collectionName, mediaCollection);
    return mediaCollection;
  },
  removeMediaFromCollection: async (medias: Media[], collectionName: string) => {
    const mediaCollection = await get().getMediaCollectionByCollectionName(collectionName);
    if (!mediaCollection) return;

    medias.forEach(media => mediaCollection && (delete mediaCollection[media.idMal]))
    await get().setStorage(collectionName, mediaCollection);
    get().refreshCollections();
  },
  removeCollectionByName: async (name: string) => {
    await localForageCollectionsStore.removeItem(name);
    get().refreshCollections();
    return name;
  },
  updateCollectionName: async (prev: string, next: string) => {
    const mediaCollection = await get().getMediaCollectionByCollectionName(prev);

    if (!mediaCollection) return null;

    await get().removeCollectionByName(prev);
    await get().setStorage(next, mediaCollection);

    return mediaCollection;
  }
}));
