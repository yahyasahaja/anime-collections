

import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

type Payload = {
  path?: string
  component: React.ReactNode,
}

export const buildRenderWithRouter = ({ path = '/animes', component }: Payload) => {
  return (
    <MemoryRouter initialEntries={[path]} >
      <Routes>
        <Route path="/animes" element={component} />
        <Route path="/animes/:id" element={component} />
        <Route path="/collections" element={component} />
        <Route path="/collections/:id" element={component} />
      </Routes>
    </MemoryRouter>
  )
}
