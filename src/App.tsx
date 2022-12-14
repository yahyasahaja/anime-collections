import Spinner from 'components/Spinner';
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

const AnimeList = React.lazy(() => import('./pages/AnimeList'));
const AnimeDetail = React.lazy(() => import('./pages/AnimeDetail'));
const CollectionList = React.lazy(() => import('./pages/CollectionList'));
const CollectionDetail = React.lazy(() => import('./pages/CollectionDetail'));

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/animes/:id" element={<AnimeDetail />} />
        <Route path="/animes" element={<AnimeList />} />
        <Route path="/collections/:collectionName" element={<CollectionDetail />} />
        <Route path="/collections" element={<CollectionList />} />
        <Route path="*" element={<Navigate to="/animes" replace />}/>
      </Routes>
    </Suspense>
  )
}
