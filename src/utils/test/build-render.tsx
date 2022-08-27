

import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";

type Payload = {
  path?: string
  component: React.ReactNode,
  mocks?: any
}

export const buildRenderWithRouter = ({ path = '/animes', component, mocks }: Payload) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[path]} >
        <Routes>
          <Route path="/animes" element={component} />
          <Route path="/animes/:id" element={component} />
          <Route path="/collections" element={component} />
          <Route path="/collections/:id" element={component} />
        </Routes>
      </MemoryRouter>
    </MockedProvider>
  )
}
