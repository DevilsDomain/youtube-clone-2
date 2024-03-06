import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import VideoPage from './routes/VideoPage.jsx';
import App from './App.jsx';
import { SearchProvider } from './Components/SearchContext.jsx';
import PlaylistOverview from './routes/PlaylistOverview.jsx';
import PlaylistWatch from './routes/PlaylistWatch.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/video/:videoID',
        element: <VideoPage />,
      },
      {
        path: '/playlist/:id/:name',
        element: <PlaylistOverview />
      },
      {
        path: '/playlist/:id/:name/:currentVideo',
        element: <PlaylistWatch />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  </React.StrictMode>,
);
