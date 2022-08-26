import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

const AnimeList = React.lazy(() => import('./pages/AnimeList'));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/animes" element={<AnimeList />} />
        <Route path="/animes/:id" element={<AnimeList />} />
        <Route path="/collections" element={<AnimeList />} />
        <Route path="/collections/:id" element={<AnimeList />} />
        <Route path="*" element={<Navigate to="/animes" replace />}/>
      </Routes>
    </Suspense>
  )
}
