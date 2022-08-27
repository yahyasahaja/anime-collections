import localforage from "localforage";
import { Media, MediaCollection } from 'types/models';

export const localForageCollectionsStore = localforage.createInstance({
  name: "collections"
});

export const getMediaByCollectionName = async (collectionName: string) => {
  return await localForageCollectionsStore.getItem<MediaCollection>(collectionName);
}

export const checkMediaExistsInCollection = async (collectionName: string, media: Media) => {
  const mediaCollection = await getMediaByCollectionName(collectionName);
  return mediaCollection?.[media.idMal];
}

export const createMediaCollection = async (collectionName: string) => {
  const newMediaCollection: MediaCollection = {};
  await localForageCollectionsStore.setItem(collectionName, {});
  return newMediaCollection;
}

export const putMediaToCollections = async (collectionName: string, media: Media) => {
  let mediaCollection = await getMediaByCollectionName(collectionName);
  if (!mediaCollection) mediaCollection = await createMediaCollection(collectionName);
  mediaCollection[media.idMal] = media;
  await localForageCollectionsStore.setItem(collectionName, mediaCollection);
  return mediaCollection;
}

export const removeCollectionByName = async (name: string) => {
  await localForageCollectionsStore.removeItem(name);
  return name;
}

export const updateCollectionName = async (prev: string, next: string) => {
  const mediaCollection = await getMediaByCollectionName(prev);

  await removeCollectionByName(prev);
  await localForageCollectionsStore.setItem(next, mediaCollection);

  return mediaCollection;
}
