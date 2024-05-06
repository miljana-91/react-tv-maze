import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shows from './pages/Shows/Shows';
import Summary from './pages/Summary/Summary';
import Schedule from './pages/Schedule/Schedule';
import Episodes from './pages/Episodes/Episodes';
import React, { ReactElement, useReducer } from 'react';
import Layout from './layouts/MainLayout/MainLayout';
import NotFound from './pages/NotFound/NotFound';
import Homepage from './pages/Homepage/Homepage';
import { ShowsContext, showsInitialState, showsReducer } from './store/shows.reducer';
import Roles from './pages/Roles/Roles';
import Cast from './pages/Cast/Cast';

const App = (): ReactElement => {
  const [store, dispatch] = useReducer(showsReducer, showsInitialState);

  const links: { [key: string]: string } = {
    homepage: '/',
    shows: '/shows',
    schedule: '/schedule',
  };

  return (
    <ShowsContext.Provider value={{ store, dispatch }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path={links.shows} element={<Shows />} />
              <Route path={links.schedule} element={<Schedule />} />
              <Route path={`${links.shows}/:id`} element={<Summary />} />
              <Route path={`${links.shows}/:id/episodes`} element={<Episodes />} />
              <Route path={`${links.shows}/:id/cast`} element={<Cast />} />
              <Route path={`/roles/:id`} element={<Roles />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ShowsContext.Provider>
  );
};

export default App;
